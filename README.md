<h2>A programming task for candidates for developer JavaScript, C#.</h2>
<br>
<ol>
  <li>Create an arbitrary form with CSS and JavaScript framework of your choice. Say, a contact or order form with at least five fields of different types: text, drop-down, date, radio, check box.</li>
  <li>You can use frameworks like vue.js, angular, react, knockout. Don't use jQuery as main JavaScript framework. It can be used as a helper only. You can use TypeScript or Babel if you want.</li>
  <li>Add validation to the form fields.</li>
  <li>Send a JSON-object with filled-in data to a REST-service on the submission:</li>
    <code>
      {
          fieldId1: 'value1',
          fieldId2: 'value2',
          ...
      }
    </code>
  <li>Implement the REST-service using C# and ASP.NET Web Api/ASP.NET Core Web API that retrieves, saves, and returns data (JSON-objects) of forms.</li>
  <li>Create a page for listing and searching the submitted objects.</li>
  <li>Pack all JS- and CSS-files of the project into a single file and minify it with the help of build system of your choice (webpack, gulp, grunt).</li>
</ol>

<p>
  <b><i>The key idea here that the form can be completely changed whereas the services will stay the same.</i></b>
</p>
<p>
  The case in the task is quite basic, but consider it real-life application. Thus, try to create good architecture and level of abstraction. We will evaluate quality of your code, usability of the UI and architecture.
</p>
