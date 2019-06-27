export const getQuestions = async function() {
  const resp = await fetch('http://localhost:3001/api/questions');
  return resp.json();
};

export const saveQuestion = async function(question) {

  const resp = await fetch('http://localhost:3001/api/questions', {
    method: 'post',
    body: JSON.stringify(question),
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });

  return resp.json();
};

export const getAnswers = async function(questionID) {
  const resp = await fetch(`http://localhost:3001/api/questions/${questionID}`);
  return resp.json();
};

export const saveAnswer = async function(answer, questionID) {
  const resp = await fetch(`http://localhost:3001/api/questions/${questionID}/answers`, {
    method: 'post',
    body: JSON.stringify(answer),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return resp.json();
};
