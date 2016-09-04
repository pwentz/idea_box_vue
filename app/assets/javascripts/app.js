const App = Vue.extend({
  template: `
    <div>
      <input 
        type='text'
        v-model='newTitle'
      >
      <input
        type='text'
        v-model='newBody'
      >
      <button
        v-on:click='handleSubmit'
        class='success button'
      >
        Save!
      </button>
      <ideas :ideas='ideas'></ideas>
    </div>
  `,
  data() {
    return {
      newTitle: '',
      newBody: '',
      ideas: []
    }
  },
  init() {
    $.getJSON('/api/v1/ideas.json')
      .done(data => {
        this.ideas = data
      })
  },
  methods: {
    handleSubmit() {
      $.ajax({
        url: '/api/v1/ideas.json',
        type: 'POST',
        data: { idea: { title: this.newTitle, body: this.newBody } },
        success: (response) => {
          $.getJSON('/api/v1/ideas.json')
          .done(data => {
            this.ideas = data
          })
        }
      })
    }
  }
})

Vue.component("app", App);
