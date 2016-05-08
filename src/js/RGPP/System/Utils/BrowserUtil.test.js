'use strict'

import BrowserUtil from './BrowserUtil'
import {
    expect
} from 'chai'

describe('BrowserUtil', () => {
    it('#getUserBrowserInfo', () => {
        const bwInfo = BrowserUtil.getUserBrowserInfo()
        expect(bwInfo).to.be.an('object')
        expect(bwInfo.type).to.exist
        expect(bwInfo.version).to.exist
    })
})
