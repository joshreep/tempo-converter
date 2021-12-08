import React, { createContext, FC, useContext } from 'react'
import { SubdivisionName } from '../constants/subdivisions'
import useAsyncStorage from '../hooks/useAsyncStorage'

export interface ISong {
    title: string
    bpm: number
    subdivision: SubdivisionName
}

interface IPlaylistContext {
    playlist: Record<string, ISong[]>
    addSong: (playlistTitle: string, song: ISong) => void
    removeSong: (playlistTitle: string, index: number) => void
    editSong: (playlistTitle: string, index: number, song: Partial<ISong>) => void
    reorderSongs: (playlistTitle: string, songs: ISong[]) => void
}

interface ISinglePlaylistContext {
    playlist: ISong[]
    addSong: (song: ISong) => void
    removeSong: (index: number) => void
    editSong: (index: number, song: Partial<ISong>) => void
    reorderSongs: (songs: ISong[]) => void
}

const DEFAULT_CONTEXT: IPlaylistContext = {
    playlist: { default: [] },
    addSong: () => void 0,
    removeSong: () => void 0,
    editSong: () => void 0,
    reorderSongs: () => void 0,
}

const PlaylistContext = createContext<IPlaylistContext>(DEFAULT_CONTEXT)

export function usePlaylist(playlistTitle: string): ISinglePlaylistContext
export function usePlaylist(): IPlaylistContext
export function usePlaylist(playlistTitle?: string): unknown {
    const context = useContext(PlaylistContext)

    if (!playlistTitle) return context

    return {
        playlist: context.playlist[playlistTitle],
        addSong: (song: ISong) => context.addSong(playlistTitle, song),
        removeSong: (index: number) => context.removeSong(playlistTitle, index),
        editSong: (index: number, song: Partial<ISong>) => context.editSong(playlistTitle, index, song),
        reorderSongs: (songs: ISong[]) => context.reorderSongs(playlistTitle, songs),
    }
}

export const PlaylistProvider: FC = ({ children }) => {
    const [playlist, setPlaylist] = useAsyncStorage<IPlaylistContext['playlist']>('playlist', DEFAULT_CONTEXT.playlist)

    const addSong: IPlaylistContext['addSong'] = (playlistTitle, songToAdd) => {
        setPlaylist({
            [playlistTitle]: [...playlist[playlistTitle], { ...songToAdd }],
        })
    }

    const removeSong: IPlaylistContext['removeSong'] = (playlistTitle, songIndex) => {
        setPlaylist({
            [playlistTitle]: [
                ...playlist[playlistTitle].slice(0, songIndex),
                ...playlist[playlistTitle].slice(songIndex + 1),
            ],
        })
    }

    const editSong: IPlaylistContext['editSong'] = (playlistTitle, songIndex, partialSong) => {
        setPlaylist({
            [playlistTitle]: [
                ...playlist[playlistTitle].slice(0, songIndex),
                { ...playlist[playlistTitle][songIndex], ...partialSong },
                ...playlist[playlistTitle].slice(songIndex + 1),
            ],
        })
    }

    const reorderSongs: IPlaylistContext['reorderSongs'] = (playlistTitle, songs) => {
        setPlaylist({ [playlistTitle]: songs })
    }

    return (
        <PlaylistContext.Provider value={{ playlist, addSong, removeSong, editSong, reorderSongs }}>
            {children}
        </PlaylistContext.Provider>
    )
}
