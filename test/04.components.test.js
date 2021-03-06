import test from "ava";
import "./_browser-mock";
/** @jsx createElement */
import { render, createElement, Component } from "../src/didact";

test.beforeEach(t => {
  let root = document.getElementById("root");
  if (!root) {
    root = document.createElement("div");
    root.id = "root";
    document.body.appendChild(root);
  }
  t.context.root = root;
});

/*
test("render component", t => {
  const root = t.context.root;
  class FooComponent extends Component {
    render() {
      return (
        <div>
          <b />
          <a href="foo" />
        </div>
      );
    }
  }
  render(<FooComponent />, root);
  t.is(root.innerHTML, '<div><b></b><a href="foo"></a></div>');
});

test("render nested component", t => {
  const root = t.context.root;
  class ItemComponent extends Component {
    render() {
      return (
        <li>
          <div id='item'>
            {this.props.name}
          </div>
        </li>
      );
    }
  }

  class ListComponent extends Component {
    render() {
      return (
      <div id='list'>
        <ul>
          {
            [1, 2].map(name => {
              return <ItemComponent name={name} />
            })
          }
        </ul>
      </div>
      )
    }
  }

  render(<ListComponent />, root);
  t.is(root.innerHTML, '<div id="list"><ul><li><div id="item">1</div></li><li><div id="item">2</div></li></ul></div>');
});

*/

test("change state on click", t => {
  const root = t.context.root;
  class FooComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        count: 0
      };
    }

    handleClick() {
      this.setState({
        count: this.state.count + 1
      });
    }

    render() {
      return <div onClick={e => this.handleClick()}>{this.state.count}</div>;
    }
  }
  render(<FooComponent />, root);
  t.is(root.innerHTML, "<div>0</div>");
  click(root.firstChild);
  t.is(root.innerHTML, "<div>1</div>");
});

function click(dom) {
  var evt = document.createEvent("MouseEvent");
  evt.initEvent("click", false, true);
  dom.dispatchEvent(evt);
}

