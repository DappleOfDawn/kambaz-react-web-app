export default function Assignments() {
  return (
    <div id="wd-assignments">
      <input placeholder="Search for Assignments"
             id="wd-search-assignment" />
      <button id="wd-add-assignment-group">+ Group</button>
      <button id="wd-add-assignment">+ Assignment</button>
      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button> </h3>
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <a href="#/Kambaz/Courses/1234/Assignments/123"
             className="wd-assignment-link" >
            A1 - ENV + HTML
          </a><br/>
          Multiple Modules | <b>Not available until</b> May 6 at 12:00am | <b>Due</b> May 13 at 11:59pm | 100pts
        </li>
        <li className="wd-assignment-list-item">
          <a href="#/Kambaz/Courses/1234/Assignments/124"
             className="wd-assignment-link" >
            A2 - CSS + BOOTSTRAP
          </a><br/>
          Multiple Modules | <b>Not available until</b> May 13 at 12:00am | <b>Due</b> May 20 at 11:59pm | 100pts
        </li>
        <li className="wd-assignment-list-item">
          <a href="#/Kambaz/Courses/1234/Assignments/125"
             className="wd-assignment-link" >
            A3 - JAVASCRIPT + REACT
          </a><br/>
          Multiple Modules | <b>Not available until</b> May 20 at 12:00am | <b>Due</b> May 27 at 11:59pm | 100pts
        </li>
      </ul>
      <h3 id="wd-assignments-title">
        QUIZZES 10% of Total <button>+</button> </h3>
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <a href="#/Kambaz/Courses/1234/Assignments/133"
             className="wd-assignment-link" >
            Q1 - ENV + HTML
          </a><br/>
          <b>Not available until</b> May 7 at 12:00am | <b>Due</b> May 14 at 11:59pm | 25pts
        </li>
        <li className="wd-assignment-list-item">
          <a href="#/Kambaz/Courses/1234/Assignments/134"
             className="wd-assignment-link" >
            Q2 - CSS + BOOTSTRAP
          </a><br/>
          <b>Not available until</b> May 14 at 12:00am | <b>Due</b> May 21 at 11:59pm | 25pts
        </li>
        <li className="wd-assignment-list-item">
          <a href="#/Kambaz/Courses/1234/Assignments/135"
             className="wd-assignment-link" >
            Q3 - JAVASCRIPT + REACT
          </a><br/>
          <b>Not available until</b> May 21 at 12:00am | <b>Due</b> May 28 at 11:59pm | 25pts
        </li>
      </ul>
      <h3 id="wd-assignments-title">
        EXAMS 10% of Total <button>+</button> </h3>
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <a href="#/Kambaz/Courses/1234/Assignments/143"
             className="wd-assignment-link" >
            MIDTERM
          </a><br/>
          <b>Not available until</b> May 8 at 12:00am | <b>Due</b> May 15 at 11:59pm | 25pts
        </li>
        <li className="wd-assignment-list-item">
          <a href="#/Kambaz/Courses/1234/Assignments/144"
             className="wd-assignment-link" >
            FINAL
          </a><br/>
          <b>Not available until</b> May 15 at 12:00am | <b>Due</b> May 22 at 11:59pm | 25pts
        </li>
      </ul>
      <h3 id="wd-assignments-title">
        PROJECT 40% of Total <button>+</button> </h3>
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <a href="#/Kambaz/Courses/1234/Assignments/123"
             className="wd-assignment-link" >
            SEMESTER PROJECT
          </a><br/>
          Multiple Modules | <b>Not available until</b> May 9 at 12:00am | <b>Due</b> May 16 at 11:59pm | 100pts
        </li>
      </ul>
    </div>
);}
