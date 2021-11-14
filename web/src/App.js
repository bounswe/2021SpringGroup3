import Post from './components/Post';
import ProfileEdit from './components/ProfileEdit';
import React from "react";
import 'antd/dist/antd.css';
import './App.css';
import { useState, Image } from 'react';

import moment from 'moment' ;


function App() {

  const [posts, setPosts] = useState([
    {
      userId: 1,
      communityId: 2,
      id: 3,
      profilePicture: 'https://avatars.githubusercontent.com/u/39625217?s=96&v=4',
      communityName: 'Rocket League',
      dataType: {
        id: 1,
        name: 'Turnuva',
        color: '#cccccc'
      },
      username: 'Ufuk',
      title: 'TESFED Turkiye Kupasi',
      fieldContents: [
        {
          type: 'text',
          title: 'Description',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras posuere leo vel justo viverra congue. Maecenas consequat ultricies vehicula. Cras auctor dui nisi, a maximus lorem molestie id. Nulla nec hendrerit odio. Donec dictum arcu a tellus venenatis, vitae sodales nisi dapibus. Aliquam dapibus ligula a tellus sollicitudin elementum. Suspendisse potenti. Cras mauris erat, consequat non diam sed, luctus condimentum erat. Etiam vitae est urna. Sed nec augue arcu. Etiam ante enim, commodo quis maximus ac, tristique at purus. Suspendisse fermentum eu orci ut congue. Ut eget convallis eros. Proin id mi suscipit, auctor ex nec, finibus justo.'
        },
        {
          type: 'imageURL',
          title: 'Poster',
          content: 'https://i2.milimaj.com/i/milliyet/75/0x410/5f6a047455428016e0124608.jpg'
        },
        {
          type: 'location',
          title: 'Konum',
          content: 'Istanbul Tema Park'
        },
        {
          type: 'number',
          title: 'Takım Boyutu',
          content: 3
        },
        {
          type: 'text',
          title: 'Ödül $',
          content: 1000
        },
        {
          type: 'date',
          title: 'Gün',
          content: '19-08-2021'
        },
        {
          type: 'link',
          title: 'Kayıt Bağlantısı',
          content: 'https://tesfed.theacademys.com.tr/'
        }
      ],
      likeCount: 130,
      commentCount: 30,
      isReported: false,
      isLiked: true,
      createdAt: "10 days"
    },
    {
      userId: 1,
      communityId: 2,
      id: 3,
      profilePicture: 'https://avatars.githubusercontent.com/u/39625217?s=96&v=4',
      communityName: 'Rocket League',
      dataType: {
        id: 1,
        name: 'Turnuva',
        color: '#cccccc'
      },
      username: 'Ufuk',
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras posuere leo vel justo viverra congue. Maecenas consequat ultricies vehicula.',
      fieldContents: [
        {
          type: 'text',
          title: 'Lorem',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras posuere leo vel justo viverra congue. Maecenas consequat ultricies vehicula. Cras auctor dui nisi, a maximus lorem molestie id. Nulla nec hendrerit odio. Donec dictum arcu a tellus venenatis, vitae sodales nisi dapibus. Aliquam dapibus ligula a tellus sollicitudin elementum. Suspendisse potenti. Cras mauris erat, consequat non diam sed, luctus condimentum erat. Etiam vitae est urna. Sed nec augue arcu. Etiam ante enim, commodo quis maximus ac, tristique at purus. Suspendisse fermentum eu orci ut congue. Ut eget convallis eros. Proin id mi suscipit, auctor ex nec, finibus justo.'
        },
        {
          type: 'imageURL',
          title: 'Cover Image',
          content: 'https://i2.milimaj.com/i/milliyet/75/0x410/5f6a047455428016e0124608.jpg'
        }
      ],
      likeCount: 130,
      commentCount: 30,
      isReported: true,
      isLiked: false,
      createdAt: "10 days"
    }
  ])

  let postComponents = posts.map((postObj)=>{
    return <Post postObj={postObj} />
  })

  let userObj = {
    username: 'Ufuk',
    profilePicture: 'https://avatars.githubusercontent.com/u/39625217?s=96&v=4',
    bio: 'sa',
    birthday: moment('11/11/2011'),
    location: 'istanbul',
    isProfilePicturePublic: true,
    isBioPublic: true,
    isBirthdayPublic: false,
    isLocationPublic: false,
    isProfilePublic: true
  }

  return (
    <>
       <ProfileEdit userObj={userObj}/>
    </>
  );
}

export default App;
