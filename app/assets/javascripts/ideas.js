const Ideas = Vue.extend({
  template: `
    <div v-for='idea in ideas'>
      <h1 
        contentEditable='true'
        v-on:blur='updateIdea(idea.id)'
        class='idea-title'
      >
        {{ idea.title }}
      </h1>
      <p 
        contentEditable='true'
        v-on:blur='updateIdea(idea.id)'
        class='idea-body'
      >
        {{ idea.body }}
      </p>
    </div>
  `,
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
