//see also: https://preactjs.com/guide/forms for a single checkbox example that uses the checked attr of the input to set the state
import { Component } from 'preact';
export default class Floater2d extends Component {
    state = { items: [
        {ident: 1, label: "Beach LT", distance: "left: 10px;top:20px;", title:"A 1 person foldable canoe. 300lbs max"},
        {ident: 2, label: "Bay ST", distance: "left: 80px;top:-20px;", title:"A 1 person foldable kayak. 300lbs max"},
        {ident: 3, label: "Coast XT", distance: "left: 300px;top:0px;",  title:"A 1 person plus gear kayak. 400lbs max."},
        {ident: 4, label: "Haven", distance: "left: 400px;top:10px;",  title:"A 2 person kayak. 400lbs max."}
        ] };
    moveMe = e => {
        let { items } = this.state;
        const idx = e.target.attributes.idx.value;
        const amount = 10;
        //retrieve previous values as x,y
        let pair = items[idx].distance.split(';');
        let x = 0; let y = 0;
        for ( var i=0; i<2; i++ ){
            let digits = parseInt(pair[i].replace(/[^0-9]/g,''));
            let sign = 1;
            if (pair[i].indexOf('-') > -1){
                sign = -1;
            }
            if (i === 1) {    
                y = sign * digits - amount;
            } else {
                x = sign * digits - amount;
            }
        }
        items[idx].distance="left:" + x + "px;top:" + y + "px;";
        this.setState({items})

    }
    move = e => {
        let { items } = this.state;
        //get left right top
        const direction = e.target.value;
        const amount = 10;
        //get current distance:
        items.map( item => {
            let pair = item.distance.split(';');
            let x = 0; let y = 0;
            for ( var i=0; i<2; i++ ){
                let digits = parseInt(pair[i].replace(/[^0-9]/g,''));
                let sign = 1;
                if (pair[i].indexOf('-') > -1){
                    sign = -1;
                }
                switch (direction) {
                    case 'up':
                        if (i === 1) {    
                            y = sign * digits - amount;
                        } else {
                            x = sign * digits;
                        }
                        break;
                    case 'down':
                        if (i === 1) {    
                            y = sign * digits + amount;
                        } else {
                            x = sign * digits;
                        }
                        break;
                    case 'left':
                        if (i === 1) {
                            y = sign * digits;
                        } else {    
                            x = sign * digits - amount;
                        }
                        break;
                    case 'right':
                    if (i === 1) {
                        y = sign * digits;
                    } else {   
                        x = sign * digits + amount;
                    }
                        break;
                }
                item.distance="left:" + x + "px;top:" + y + "px;";
            }
        })
        this.setState({items})
    }
    //trick: index (idx) is used to directly upldate state value
    render({ }, { items, values }) {
        return (
            <div style="border:1px solid black; padding:5px;">
                <h1>Data Driven Floaters 2d</h1> 
                <div style="width:100wv;border:1px solid black;height:60px;">&nbsp;
                    <div class="posRel">
                    { items.map( (item, idx) => ( 
                        <div class="horizontalList" style={item.distance} title={item.title} >
                            {item.label}
                            <div idx={idx} style="font-size:.7em" onClick={this.moveMe}>{item.distance}</div>
                        </div>
                    )) } 
                    </div> 
                </div>
                <p>------- C o n t r o l s -------------</p>  
                <button style="margin-left: 10px;" value="left" onClick={this.move}>Move Boats Left</button>
                <button style="margin-left: 10px;" value="right" onClick={this.move}>Move Boats Right</button>
                <button style="margin-left: 10px;" value="up" onClick={this.move}>Move Boats Up</button>
                <button style="margin-left: 10px;" value="down" onClick={this.move}>Move Boats Down</button>
            </div>
        );
    }

}