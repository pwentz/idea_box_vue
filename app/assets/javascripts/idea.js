window.onload = () => {
  let Idea = new Vue ({
    el: '#ideas',
    data: {
      ideas: []
    },
    methods: {
      deleteIdea(id) {
        removeIdea(id)
      }
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

  function fillIdeas(response) {
    Idea.ideas = response;
  }

  function removeIdea(id) {
    $.ajax({
      url: `/api/v1/ideas/${id}.json`,
      type: 'DELETE',
      success: function() {
        Idea.ideas = Idea.ideas.filter(( idea ) => {
          return idea.id !== id
        });
      }
    })
  }

  let IdeaGenerator = new Vue({
    el: '#new-idea',
    data: {
      newIdeaTitle: '',
      newIdeaBody: ''
    },
    methods: {
      newIdea(newTitle, newBody) {
        generateIdea(newTitle, newBody)
      }
    }
  })

  function generateIdea(title, body) {
    $.ajax({
      url: '/api/v1/ideas.json',
      type: 'POST',
      data: { idea: { title: title, body: body } },
      success: (response) => {
        Idea.ideas.unshift(response)
        clearInputs();
      }
    });
  }

  function clearInputs() {
    $('#new-idea input').val('');
    $('#new-idea textarea').val('');
  }
}
