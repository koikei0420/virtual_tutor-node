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

// export const getPage = async function(storyId, pageId) {
//   const resp = await fetch(`/api/stories/${storyId}/pages/${pageId}`);
//   return resp.json();
// };

// export const savePage = async function(storyId, parentId, name, text) {
//   const resp = await fetch(`/api/stories/${storyId}/pages/${parentId}/next`, {
//     method: 'post',
//     body: JSON.stringify({ name, text }),
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });
//   return resp.json();
// };
