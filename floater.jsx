//see also: https://preactjs.com/guide/forms for a single checkbox example that uses the checked attr of the input to set the state
import { Component } from 'preact';
export default class Floater extends Component {
    state = { items: [
        {ident: 1, label: "Beach LT", distance: "left: 10px;", title:"A 1 person foldable canoe. 300lbs max"},
        {ident: 2, label: "Bay ST", distance: "left: 80px;", title:"A 1 person foldable kayak. 300lbs max"},
        {ident: 3, label: "Coast XT", distance: "left: 300px;",  title:"A 1 person plus gear kayak. 400lbs max."},
        {ident: 4, label: "Haven", distance: "left: 400px;",  title:"A 2 person kayak. 400lbs max."}
        ] };
    move = e => {
        let { items } = this.state;
        //get left right
        const direction = e.target.value;
        //get current distance:
        items.map( item => {
            let digits = parseInt(item.distance.replace(/[^0-9]/g,''));
            let left = direction === "right" ? digits + 30 : digits - 30;
            item.distance="left:" + left + "px;"
        })
        this.setState({items})
    }
    render({ }, { items }) {
        return (
            <div style="border:1px solid black; padding:5px;">
                <h1>Data Driven Floaters</h1> 
                <ul>
                    <li>Absolutely positioned elements float inside the first non-static parent element containing them. That's their x/y box.</li>
                    <li>I use this technique when trying to represent data on a time or distance axis</li>
                    <li>Left/right position is set on the element by the style tag; e.g  'left: 400px;'</li>
                    <li>The text string is stored in each component's state data; e.g.  label: "Haven", distance: "left: 400px;",  </li>
                    <li>Use the Controls below to update the left position of the floaters; observe the value of left changing.</li>
                </ul>
                <div style="width:100wv;border:1px solid black;height:60px;">&nbsp;
                    <div class="posRel">
                    { items.map( (item, idx) => ( 
                        <div class="horizontalList" style={item.distance} title={item.title} >
                            {item.label}
                            <div style="font-size:.7em">{item.distance}</div>
                        </div>
                    )) } 
                    </div> 
                </div>
                <p>------- C o n t r o l s -------------</p>  
                <button value="left" onClick={this.move}>Move Boats Left</button>
                <button style="margin-left: 10px;" value="right" onClick={this.move}>Move Boats Right</button>
            </div>
        );
    }

}