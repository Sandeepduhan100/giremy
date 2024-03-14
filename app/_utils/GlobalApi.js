const { gql, default: request } = require("graphql-request")

console.log("asdfghjkl",process.env.NEXT_PUBLIC_HYGRAPH_API_KEY);

const MASTER_URL="https://api-ap-south-1.hygraph.com/v2/"+process.env.NEXT_PUBLIC_HYGRAPH_API_KEY+"/master"


const getAllCourseList= async()=>{
    const query= gql`query CourseLists {
      courseLists(first: 20) {
        createdAt
        description
        id
        name
        publishedAt
        updatedAt
        free
        chapter {
          ... on Chapter {
            id
            name
            video {
              url
            }
            youtubeUrl
          }
        }
        demoUrl
        banner {
          url
        }
        author
        slug
      }
    }
    
      `
      const result = await request(MASTER_URL,query);
      return result;
}

const getSideBannner = async()=>{
  const query= gql`
  query getSideBanner {
    sideBanners {
      id
      name
      banner {
        id
        url
      }
    }
  }
  `
  const result = await request(MASTER_URL,query);
      return result;
}

const getCourseById= async(courseid)=>{
  const query=gql`
  query MyQuery {
    courseLists(where: {slug: "`+courseid+`"}) {
      id
      
      author
      banner {
        url
      }
      chapter {
        ... on Chapter {
          id
          name
          youtubeUrl
          video{
            url
          }
        }
      }
      demoUrl
      description
      free
      tag
      slug
      totalChapters
      name
    }
  }
  `
  const result = await request(MASTER_URL,query);
  return result;
}

const enrollToCourse=async(courseid,email)=>{
  const query= gql`
  mutation MyMutation {
    createUserEnrollCourse(
      data: {courseId: "`+courseid+`", userEmail: "`+email+`", courseList: {connect: {slug: "`+courseid+`"}}}
    ) {
      id
    }
    publishManyUserEnrollCoursesConnection {
      edges {
        node {
          id
        }
      }
    }
  }
  `
  const result = await request(MASTER_URL,query);
  return result;
}

const checkUserEnrolledToCourse= async(courseid,email)=>{
  const query= gql`
  query MyQuery {
    userEnrollCourses(where: {courseId: "`+ courseid+`", userEmail: "`+email+`"}) {
      id
    }
  }
  `
   const result = await request(MASTER_URL,query);
  return result;
}
const getUserEnrolledCourseDetails=async(id,email)=>{
  const query =gql`query MyQuery {
    userEnrollCourses(where: {id: "`+id+`", userEmail: "`+email+`"}) {
      courseId
      id
      userEmail
      compltedChapter {
        ... on CompltedChapter {
          id
          chapterId
        }
      }
      courseList {
        author
        banner {
          url
        }
        chapter {
          ... on Chapter {
            id
            name
            shortDesc
            video {
              url
            }
          }
        }
        demoUrl
        description
        id
        name
        slug
        totalChapters
      }
    }
  }
  `
  const result = await request(MASTER_URL,query);
  return result;
}
const markChapterCompleted=async(enrollid,chapterId)=>{
  const query =gql`
  mutation MyMutation {
    updateUserEnrollCourse(
      data: {compltedChapter: {create: {CompltedChapter: {data: {chapterId: "`+chapterId+`"}}}}}
      where: {id: "`+enrollid+`"}
    )
    {
      id
    }
    publishUserEnrollCourse(where: {id: "`+enrollid+`"}) {
      id
    }
  }
  
  `
  const result = await request(MASTER_URL,query);
  return result;
}

const getUserAllEnrolledCourseList= async(email)=>{
  const query = gql`
  query MyQuery {
    userEnrollCourses(where: {userEmail: "`+email+`"}) {
      compltedChapter {
        ... on CompltedChapter {
          id
          chapterId
        }
      }
      courseId
      courseList {
        name
        id
        totalChapters
        slug
        free
        description
        demoUrl
        chapter {
          ... on Chapter {
            id
            name
          }
        }
        author
        banner {
          url
        }
      }
    }
  }
  `
  const result = await request(MASTER_URL,query);
  return result;
}

const addNewMember=async(email,paymentId)=>{
  const query=gql`
  mutation MyMutation {
    createMembership(data: {active: true, email: "`+email+`", paymentId: "`+paymentId+`"}) {
      id
    }
    publishManyMemberships(to: PUBLISHED) {
      count
    }
  }
  `
  const result = await request(MASTER_URL,query);
  return result;
}

const checkForMembership=async(email)=>{
  const query = gql`
  query MyQuery {
    memberships(where: {email: "`+email+`"}) {
      email
      id
      paymentId
      createdAt
    }
  }
  `
  const result = await request(MASTER_URL,query);
  return result;
}
export default{
    getAllCourseList,getSideBannner, getCourseById,enrollToCourse,checkUserEnrolledToCourse,
    getUserEnrolledCourseDetails,markChapterCompleted,getUserAllEnrolledCourseList,addNewMember,checkForMembership
}