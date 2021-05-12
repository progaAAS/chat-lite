import React from 'react';
import Join from "./Join";

// class JoinContainer extends React.Component {


//     render() {
//         return <Join {...this.props, onEnter={onEnter}} />
//     }
// }
const mapStateToProps = (state) => ({
   
});

const mapDispatchToProps = (state) =>{
    onEnter: (roomId, userName) => {
        console.log(roomId, userName)
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Join);