export const getStore = (state) => state.plugin.mapChipEditor

export const getSaveData = (state) => {
    const store = getStore(state)
    return {
        maps: store.maps.data,
        palettes: store.maps.data
    }
}
