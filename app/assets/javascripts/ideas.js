const Ideas = Vue.extend({
  template: ` 
    <div 
      v-for='idea in ideas'
      class='row'
    >
      <div
        class='small-6 \
               small-centered \ 
               columns idea-container'
      >
        <div
          class='callout \
                 primary \
                 idea-info'
        >
          <h5
            contentEditable='true'
            v-on:blur='updateIdea(idea.id)'
            class='idea-title'
          >
            {{ idea.title }}
          </h5>
          <p 
            contentEditable='true'
            v-on:blur='updateIdea(idea.id)'
            class='idea-body'
          >
            {{ idea.body }}
          </p>
          <div class='row'>
            <div
              class='small-3 \
                     small-offset-9 \
                     columns \
                     btn-container'
            >
              <button
                class='button \
                       alert \
                       hollow'
                v-on:click='handleDelete(idea.id)'
              >
                <i class='fi-x'></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
   `
  ,

  props: ['ideas'],
  methods: {

    fetchIdeas() {
      $.getJSON('api/v1/ideas.json')
        .done(data => {
          this.ideas = data
        })
    },

    updateIdea(id) {
      let updatedIdea = event.target.textContent.trim();
      if (event.target.className === 'idea-title') this.updateTitle(id, updatedIdea)
      if (event.target.className === 'idea-body') this.updateBody(id, updatedIdea)
    },

    updateTitle(id, updatedIdea) {
      $.ajax({
        url: `/api/v1/ideas/${id}`,
        data: { idea: { title: updatedIdea } },
        type: 'PUT',
        success: response => { 
          this.fetchIdeas()
        }
      })
    },

    updateBody(id, updatedIdea) {
      $.ajax({
        url: `/api/v1/ideas/${id}`,
        data: { idea: { body: updatedIdea } },
        type: 'PUT',
        success: response => { 
          this.fetchIdeas();
        }
      })
    },

    handleDelete(id) {
      $.ajax({
        url: `api/v1/ideas/${id}.json`,
        type: 'DELETE',
        success: response => {
          this.fetchIdeas();
        }
      })
    }
  }
})

Vue.component('ideas', Ideas);
