import "./App.css";
import 'bulma/css/bulma.css';
import Course from "./components/Course";
import image1 from "./images/1.jpg";
import image2 from "./images/2.png";
import image3 from "./images/3.png";
import image4 from "./images/4.jpg";

function App() {
  return (
    <div className="App">
      <section className="hero is-link">
        <div className="hero-body">
          <p className="title">Cards</p>
        </div>
      </section>

      <div className="container">
        <section className="section">
          <div className="columns">
            <div className="column">
              <Course
                image={image1}
                title="React"
                description="React is a JavaScript library for building user interfaces."
              />
            </div>
            <div className="column">
              <Course
                image={image2}
                title="Angular"
                description="Angular is a TypeScript-based open-source web application framework led by the Angular Team at Google and by a community of developers and companies."
              />
            </div>
            <div className="column">
              <Course
                image={image3}
                title="Vue"
                description="Vue.js is an open-source JavaScript framework for building user interfaces."
              />
            </div>
            <div className="column">
              <Course
                image={image4}
                title="Svelte"
                description="Svelte is a radical new approach to building user interfaces."
              />
            </div>
          </div>
        </section>
      </div>
      
    </div>
  );
}

export default App;

// ana class dan özellik olarak gönderilen yapılar için props kullanılır
// props olarak toplu da gönderilebilir
// direk değişken olarak da gönderilebilir
