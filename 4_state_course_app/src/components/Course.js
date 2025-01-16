import Angular from '../images/angular.jpg';
import Bootstrap from '../images/bootstrap5.png';
import Ccsharp from '../images/ccsharp.png';
import Kompleweb from '../images/kompleweb.jpg'; 

const courseMap = {
  Angular,
  Bootstrap,
  Ccsharp,
  Kompleweb,
};

function Course({ courseName }) {
  //console.log(Angular);
  //console.log(courseName);
  return (
    <div className='courseDiv'>
      <img className='course' src={courseMap[courseName]} alt="" />
    </div>
  );
}

export default Course;


// ffc  --> importlarda paranteze gerek yoktur
