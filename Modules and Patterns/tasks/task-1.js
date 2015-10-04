/* Task Description */
/* 
* Create a module for a Telerik Academy course
  * The course has a title and presentations
    * Each presentation also has a title
    * There is a homework for each presentation
  * There is a set of students listed for the course
    * Each student has firstname, lastname and an ID
      * IDs must be unique integer numbers which are at least 1
  * Each student can submit a homework for each presentation in the course
  * Create method init
    * Accepts a string - course title
    * Accepts an array of strings - presentation titles
    * Throws if there is an invalid title
      * Titles do not start or end with spaces
      * Titles do not have consecutive spaces
      * Titles have at least one character
    * Throws if there are no presentations
  * Create method addStudent which lists a student for the course
    * Accepts a string in the format 'Firstname Lastname'
    * Throws if any of the names are not valid
      * Names start with an upper case letter
      * All other symbols in the name (if any) are lowercase letters
    * Generates a unique student ID and returns it
  * Create method getAllStudents that returns an array of students in the format:
    * {firstname: 'string', lastname: 'string', id: StudentID}
  * Create method submitHomework
    * Accepts studentID and homeworkID
      * homeworkID 1 is for the first presentation
      * homeworkID 2 is for the second one
      * ...
    * Throws if any of the IDs are invalid
  * Create method pushExamResults
    * Accepts an array of items in the format {StudentID: ..., Score: ...}
      * StudentIDs which are not listed get 0 points
    * Throw if there is an invalid StudentID
    * Throw if same StudentID is given more than once ( he tried to cheat (: )
    * Throw if Score is not a number
  * Create method getTopStudents which returns an array of the top 10 performing students
    * Array must be sorted from best to worst
    * If there are less than 10, return them all
    * The final score that is used to calculate the top performing students is done as follows:
      * 75% of the exam result
      * 25% the submitted homework (count of submitted homeworks / count of all homeworks) for the course
*/

function solve() {
  var Course = {
    init: function (title, presentations) {
      this.title = title;
      this.presentations = presentations;
      this.students = [];

      return this;
    },

    addStudent: function (name) {
      var names = [],
        id = this.students.length + 1;

      isValidName(name);
      names = name.split(' ');

      this.students.push({
        firstname: names[0],
        lastname: names[1],
        id: id
      });
      
      return id;
    },

    getAllStudents: function () {
      return this.students.slice();
    },

    submitHomework: function (studentID, homeworkID) {
      isValidID(studentID, this.students.length);
      isValidID(homeworkID, this.presentations.length);
    },

    pushExamResults: function (results) {
      areValidExamResults(results, this.students.length);
    },
    getTopStudents: function () {
    }
  };

  Object.defineProperty(Course, 'title', {
    get: function () {
      return Course._title;
    },
    set: function (title) {
      isValidTitle(title);
      Course._title = title;
    }
  });

  Object.defineProperty(Course, 'presentations', {
    get: function () {
      return Course._presentations;
    },
    set: function (presentations) {
      isValidPresentationArray(presentations);
      Course._presentations = presentations;
    }
  });

  function isValidTitle(title) {
    if (title === null || typeof title !== 'string') {
      throw 'Invalid type for title.';
    }

    if (title.trim() === '' || title !== title.trim()) {
      throw 'Invalid title.';
    }

    if (/[\s]{2,}/.test(title)) {
      throw 'Invalid spacing.';
    }
  }

  function isValidPresentationArray(presentations) {
    var index,
      presentationsLength = presentations.length

    if (presentations === null || !Array.isArray(presentations)) {
      throw 'Invalid type of presentations';
    }

    if (presentations.length === 0) {
      throw 'There is no presentations!.';
    }

    for (index = 0; index < presentationsLength; index += 1) {
      isValidTitle(presentations[index]);
    }
  }

  function isValidName(name) {
    var nameArray;

    if (name === null || typeof name !== 'string') {
      throw 'Invalid type of names';
    }

    nameArray = name.split(' ');
    if (nameArray.length !== 2) {
      throw 'Name must be in the format: firstname, lastname!';
    }

    nameArray.forEach(function (name) {
      if (!/^[A-Z][a-z]*$/.test(name)) {
        throw 'Invalid name.';
      }
    });
  }

  function isValidID(id, maxValidNumber) {
    id = +id;

    if (isNaN(id)) {
      throw 'ID mudt be a number';
    }

    if (id < 1 || id > maxValidNumber) {
      throw 'ID is out of range';
    }
  }

  function areValidExamResults(results, maxValidNumber) {
    var i,
      j,
      len;

    if (results == null || !Array.isArray(results)) {
      throw 'Invalid type of results!';
    }

    if (results.some(function (result) {
      return (isNaN(result.StudentID) || isNaN(result.Score) || result.StudentID < 1 || result.StudentID > maxValidNumber);
    })) {
      throw 'Invalid results!'
    }

    for (i = 0, len = results.length - 1; i < len; i += 1) {
      if (results[i].StudentID === results[i + 1].StudentID) {
        throw 'Student tried to cheat :D';
      }
    }
  }


  return Course;
}


module.exports = solve;
