import React from 'react'

class MainPanel extends React.Component {
    render() {
        return (
            <div id='main-panel' className='main-panel'>
                <section id='toolbar-left' className='toolbar'>
                    <div id='open-sb-left' className='menu-button menu-left'>open sb-left</div>
                </section>
                <section id='leftSidebar' className='leftSidebar'></section>
            </div>
        )
    }
}

export default MainPanel
