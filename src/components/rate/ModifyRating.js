import React from 'react'
import ManageRatingsPage from './ManageRatingsPage'


function ModifyRating(props) {
    const ratingId = props.match.params?.ratingId;
    return (
        <div>
            <ManageRatingsPage ratingId={ratingId} edit={true} />
        </div>
    )
}

export default ModifyRating
