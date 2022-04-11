import React from 'react'
import ContentLoader from 'react-content-loader'

const CourseEditLoader = ({ ...rest }) => (
    <ContentLoader height="550" width="900" viewBox="0 0 265 230" {...rest}>
        <rect x="15" y="15" rx="4" ry="4" width="350" height="20" />
        <rect x="15" y="50" rx="2" ry="2" width="350" height="70" />

    </ContentLoader>
)



export default CourseEditLoader