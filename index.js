import { LitElement, html, css } from 'https://unpkg.com/lit-element?module';

class TodoView extends LitElement {
	static get properties() {
		return {
			todos: { type: Array },
			filter: { type: String },
			task: { type: String }
		};
	}
	static get styles() {
		return [
			css`
				.completed {
					color: blue;
				}
			`
		];
	}
	constructor() {
		super();
		this.todos = [];
		this.task = '';
	}
	add() {
		if (this.task) {
			this.todos = [ ...this.todos, { task: this.task, completed: false } ];
			console.log(this.task);
			this.task = '';
		}
	}
	enterkey(e) {
		if (e.key === 'Enter') this.add();
	}
	toggle(k) {
		console.log(k);
		this.todos = this.todos.map((x) => (k === x ? { ...x, completed: (x = !x.completed) } : x));
		console.log(this.todos);
	}
	render() {
		return html`
      <div id="layout" @keyup=${this.enterkey} >
	   <input id="inp" .value=${this.task} @change=${(e) => (this.task = e.target.value)}  >
	   <button @click="${this.add}">Add this</button>

	   <ul>
	   ${this.todos.map((x, k) => {
			console.log('reload');
			return html`<li class=${x.completed ? 'completed' : 'not'} @click=${() =>
				this.toggle(x)}><b>${x.task}</b></li>`;
		})}
	   </ul>

      </div>
    `;
	}
}

customElements.define('todo-view', TodoView);
