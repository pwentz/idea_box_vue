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
          $.getJSON('/api/v1/ideas.json')
            .done(data => {
              this.ideas = data.sort( (a, b) => { return b.id - a.id })
            })
        }
      })
    },
    updateBody(id, updatedIdea) {
      $.ajax({
        url: `/api/v1/ideas/${id}`,
        data: { idea: { body: updatedIdea } },
        type: 'PUT',
        success: response => { 
          $.getJSON('/api/v1/ideas.json')
            .done(data => {
              this.ideas = data.sort( (a, b) => { return b.id - a.id })
            })
        }
      })
    }
  }
})

Vue.component('ideas', Ideas);
