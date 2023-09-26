import React, { createContext, FC, PropsWithChildren, useContext } from 'react'
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
    moveSong: (playlistTitle: string, oldIndex: number, newIndex: number) => void
}

interface ISinglePlaylistContext {
    playlist: ISong[]
    addSong: (song: ISong) => void
    removeSong: (index: number) => void
    editSong: (index: number, song: Partial<ISong>) => void
    moveSong: (oldIndex: number, newIndex: number) => void
}

const DEFAULT_CONTEXT: IPlaylistContext = {
    playlist: { default: [] },
    addSong: () => void 0,
    removeSong: () => void 0,
    editSong: () => void 0,
    moveSong: () => void 0,
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
        moveSong: (oldIndex: number, newIndex: number) => context.moveSong(playlistTitle, oldIndex, newIndex),
    }
}

export const PlaylistProvider: FC<PropsWithChildren> = ({ children }) => {
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

    const moveSong: IPlaylistContext['moveSong'] = (playlistTitle, oldIndex, newIndex) => {
        const songToMove = playlist[playlistTitle][oldIndex]
        const playlistWithoutSong = [
            ...playlist[playlistTitle].slice(0, oldIndex),
            ...playlist[playlistTitle].slice(oldIndex + 1),
        ]
        const playlistWithSongAtNewPosition = playlistWithoutSong.splice(newIndex, 0, songToMove)

        setPlaylist({ [playlistTitle]: playlistWithSongAtNewPosition })
    }

    return (
        <PlaylistContext.Provider value={{ playlist, addSong, removeSong, editSong, moveSong }}>
            {children}
        </PlaylistContext.Provider>
    )
}
