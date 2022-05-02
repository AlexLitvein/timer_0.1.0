import React, { useState } from 'react';

<<<<<<< HEAD
import CardViewerStyles from './CardViewer.module.css';

export const CardList = ({ list }) => {
  const renderList = () => {
    return list.map((el) => el);
  };
  return (
    <div className={CardViewerStyles.cardList}>
      {/* {renderList} */}
      {list}
    </div>
  );
};

export const CardViewer = (props) => {
  return (
    <div className={CardViewerStyles.cardViewer}>
      <div className={CardViewerStyles.cardView}>dgfdgf</div>
      <CardList {...props} />
    </div>
  );
};
=======
import CardViewerStyles from './CardViewer.module.css'

export const CardList = ({ list }) => {

    const renderList = () => {
        return list.map((el) => el)
    }
    return (
        <div className={CardViewerStyles.cardList}>
            {/* {renderList} */}
            {list}
        </div >
    )
}

export const CardViewer = (props) => {


    return (
        <div className={CardViewerStyles.cardViewer}>
            <div className={CardViewerStyles.cardView}>
dgfdgf
            </div >
            <CardList {...props} />
        </div >
    )
}
>>>>>>> 56aa5e9ebb5b4ab9dadaf3be04adfb69d20b7846
