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
          fill_ideas(response)
        }
      })
    }
  })

  function fill_ideas(response) {
    Idea.ideas = response;
  }
}
