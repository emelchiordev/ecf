import React, { Fragment } from 'react'
import ContentLoader from 'react-content-loader'

const SectionEditLoader = props => {
    const { rows = 5 } = props
    const rowHeight = 150

    return (
        <ContentLoader viewBox={`0 0 2000 ${rowHeight * rows}`} {...props}>
            {new Array(rows).fill(' ').map((el, index) => {
                const contentVerticalPosition = contentHeight =>
                    rows > 1 ? contentHeight + rowHeight * index : contentHeight
                return (
                    <Fragment key={index}>

                        <rect
                            x="30"
                            y={`${contentVerticalPosition(20)}`}
                            rx="10"
                            ry="4"
                            width="1700"
                            height="60"
                        />
                        <rect
                            x="1800"
                            y={`${contentVerticalPosition(40)}`}
                            rx="4"
                            ry="4"
                            width="20"
                            height="20"
                        />

                        <rect
                            x="1900"
                            y={`${contentVerticalPosition(40)}`}
                            rx="4"
                            ry="4"
                            width="20"
                            height="20"
                        />

                        <rect
                            y={`${contentVerticalPosition(120)}`}
                            x="10"
                            ry="10"
                            width="1500"
                            height="1"
                        />

                    </Fragment>
                )
            })}
        </ContentLoader>
    )
}

export default SectionEditLoader