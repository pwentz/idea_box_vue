window.onload = () => {
  let Idea = new Vue ({
    el: '#ideas',
    data: {
      ideas: []
    },
    ready: () => {
      $.ajax({
        url: '/api/v1/ideas.json',
        success: (response) => {
          fillIdeas(response)
        }
      })
    }
  })

  let IdeaGenerator = new Vue({
    el: '#new-idea',
    data: {
      newIdeaTitle: '',
      newIdeaBody: ''
    },
    methods: {
      newIdea(newTitle, newBody) {
        $.ajax({
          url: '/api/v1/ideas.json',
          type: 'POST',
          data: { idea: { title: newTitle, body: newBody } },
          success: (response) => {
            Idea.ideas.unshift(response)
            clearInputs();
          }
        });
      }
    }
  })

  function fillIdeas(response) {
    Idea.ideas = response;
  }

  function clearInputs() {
    $('#new-idea input').val('');
    $('#new-idea textarea').val('');
  }
}
