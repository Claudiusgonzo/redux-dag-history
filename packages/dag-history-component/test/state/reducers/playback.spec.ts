import {
	default as makeReducer,
	INITIAL_STATE,
} from '../../../src/state/reducers/playback'

import {
	doStartPlayback,
	stopPlayback,
} from '../../../src/state/actions/creators'
import * as types from '../../../src/state/actions/types'

const defaultConfig = {
	actionFilter: () => false,
}

describe('The Playback reducer', () => {
	it('will emit an initial state', () => {
		const state = makeReducer(defaultConfig)(undefined, { type: 'derp' })
		expect(state).toEqual(INITIAL_STATE)
	})

	it('can handle a startPlayback event', () => {
		let state
		const reduce = makeReducer(defaultConfig)
		state = reduce(state, { type: 'derp' })
		state = reduce(state, doStartPlayback({ initialDepth: 3, stateId: '1' }))
		expect(state).toEqual({
			isPlayingBack: true,
			bookmark: 0,
			depth: 3,
		})
	})

	it('can handle a stopPlayback event', () => {
		let state
		const reduce = makeReducer(defaultConfig)
		state = reduce(state, { type: 'derp' })
		state = reduce(state, doStartPlayback({ initialDepth: 3, stateId: '1' }))
		state = reduce(state, stopPlayback())
		expect(state).toEqual(INITIAL_STATE)
	})

	it('can handle a selectBookmarkDepth event', () => {
		let state
		const reduce = makeReducer(defaultConfig)
		state = reduce(state, { type: 'derp' })
		state = reduce(state, doStartPlayback({ initialDepth: 3, stateId: '1' }))

		state = reduce(state, {
			type: types.SELECT_BOOKMARK_DEPTH,
			payload: {
				depth: 5,
				bookmarkIndex: 1,
			},
		})
		expect(state).toEqual({
			isPlayingBack: true,
			bookmark: 1,
			depth: 5,
		})
	})
})
