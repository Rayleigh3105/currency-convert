const users= [{
    id: 1,
    name: 'Moritz',
    schoolId: 101
},{
    id: 2,
    name: 'Jessica',
    schoolId: 999
}
];

const grades = [{
    id: 1,
    schoolId: 101,
    grade: 67
},{
    id: 2,
    schoolId: 999,
    grade: 87
},{
    id: 3,
    schoolId: 101,
    grade: 34
},];

const getUser = ( id ) => {
  return new Promise( ( resolve, reject ) => {
      const user = users.find( ( user ) => user.id === id );

      if ( user ) {
          resolve( user )
      } else {
       reject( `Unable to find user with id of ${id}` );
      }
  })
};



const getGrades = ( schollId ) => {
    return new Promise( ( (resolve, reject) => {
        resolve( grades.filter( ( grade ) => grade.schoolId === schollId))
    }))
};

const getStatus = ( userId ) => {
    let user;
    return getUser( userId ).then( ( tempUser ) => {
        user = tempUser;
        return getGrades( user.schoolId );
    }).then( ( grades ) => {
        let average = 0;

        if ( grades.length > 0 ) {
            average = grades.map( ( grade ) => grade.grade ).reduce( ( a, b ) => a + b ) / grades.length;
        }

        return `${user.name} has a ${average}% in the class.`
        console.log( average )
    })
}

const getStatusAlt = async ( userId ) => {
    const user = await getUser( userId );
    const grades = await getGrades( user.schoolId );

    let average = 0;

    if ( grades.length > 0 ) {
        average = grades.map( ( grade ) => grade.grade ).reduce( ( a, b ) => a + b ) / grades.length;
    }

    return `${user.name} has a ${average}% in the class.`
    console.log( average )
};

// getStatus( 2 )
//     .then( ( user ) => {
//         console.log( user )
//     })
//     .catch( ( e ) => {
//     console.log( e );
// });

getStatusAlt(2).then( ( name ) => {
    console.log( name );
}).catch( ( error ) => {
    console.log( error )
})

