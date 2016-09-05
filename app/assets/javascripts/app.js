const App = Vue.extend({
  template:` 
    <div>
      <div class='filler'>
      </div>
      <h1 id='header'>
        Ideabox (with Vue.js!)
      </h1>
      <div class='filler'>
      </div>
      <div class='row'>
        <div class='small-6 \
                    small-centered \
                    columns'
             id='new-idea'
        >
          <div class='input-filler'>
          </div>
          <div class='row'>
            <div class='small-8 \
                        small-centered \
                        columns'
            >
              <input 
                type='text'
                v-model='newTitle'
                placeholder='title...'
              >
              <input
                type='text'
                v-model='newBody'
                placeholder='body...'
              >

              <div class='row'>
                <div class='small-4 \
                            small-centered \
                            columns \
                            btn-container'
                >
                  <button
                    v-on:click='handleSubmit'
                    class='button \
                           success \
                           hollow'
                  >
                    <i class='fi-lightbulb'></i>
                    save!
                  </button>
                </div>
              </div>
              <div class='row'>
                <div class='small-4 \
                            small-centered \
                            columns
                            btn-container'
                >
                  <button class='button \
                                 alert'
                          v-on:click='handleClear'
                  >
                    <i class='fi-skull'></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ideas
        :ideas='ideas'
      >
      </ideas>
    </div> 
    `,

  data() {
    return {
      newTitle: '',
      newBody: '',
      ideas: []
    }
  },

  ready() {
    this.fetchIdeas()
  },

  methods: {

    fetchIdeas() {
      $.getJSON('api/v1/ideas.json')
        .done(data => {
          this.ideas = data
        })
    },

    handleSubmit() {
      $.ajax({
        url: '/api/v1/ideas.json',
        type: 'POST',
        data: { idea: { title: this.newTitle, body: this.newBody } },
        success: (response) => {
          this.fetchIdeas();
        }
      })
    },

    handleClear() {
      $.getJSON('api/v1/ideas/clear.json')
        .done(data => {
          this.fetchIdeas();
        })
    }
  }
})

Vue.component("app", App);
