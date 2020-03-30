import { Component } from 'preact';
export default class Floater3df extends Component {
    state = { items: [
        {ident: 1, label: "Beach LT", distance: "left:10px; top:20px; height:30px; width:80px; font-size:1.1em; padding: 5px; opacity:.2;", title:"A 1 person foldable canoe. 300lbs max"},
        {ident: 2, label: "Bay ST", distance: "left:80px; top:-20px; height:30px; width:80px; font-size:1.1em; padding: 1px; opacity:.4;", title:"A 1 person foldable kayak. 300lbs max"},
        {ident: 3, label: "Coast XT", distance: "left:300px; top:0px; height:25px; width:90px; font-size:1.1em; padding: 15px; opacity:.8;",  title:"A 1 person plus gear kayak. 400lbs max."},
        {ident: 4, label: "Haven", distance: "left:500px; top:10px; height:25px; width:120px; font-size:1.1em; padding: 15px; opacity:.9;",  title:"A 2 person kayak. 400lbs max."}
        ] };

        //
    combine = (x,y,z1,z2,z3,z4,fade) => {
        return "left:" + x + "px; top:" + y + "px; height:" + z1 + "px; width:" + z2 + "px; font-size:"+z3+"em; padding:" + z4  + "px; opacity:" + fade;
    }

    morph = (coord, digits, opcode) => {
        switch(opcode) {
            case "moveone": {
                switch (coord) {
                    //nudge one of each of the coordinates
                    case 0: //x attribute
                        return digits + 10;
                    case 1: //y attribute
                        return digits - 10;
                    case 2: //z1 pan aka height attribute
                        //when the attribute goes to 0, its removed from the style array, so minimim is 1.
                        let ht = digits - 5;
                        if (ht <= 0) ht = 1;
                        return ht;
                    case 3: //z2 pan aka width attribute
                        let wid = digits - 5;
                        if (wid <= 0) wid = 1;
                        return wid;
                    case 4: //z3 pan aka font-size
                        return digits - 0.1;
                    case 5: //z4  pan padding
                        let pad = digits -1;
                        return pad > 0 ? pad : 1;
                    case 6: //fade aka opacity+
                        return digits - 0.1;
                    default: 
                        return digits      
                }
            }
            case "up": {
                switch (coord) {
                    case 1: //y attribute
                        return digits - 10;
                    default:
                        return digits       
                } 
            }
            case "down": {
                switch (coord) {
                    case 1: //y attribute
                        return digits + 10;
                    default:  
                        return digits     
                } 
            }
            case "left": {
                switch (coord) {
                    case 0: //x attribute
                        return digits - 10;
                    default:  
                        return digits     
                } 
            }
            case "right": {
                switch (coord) {
                    case 0: //x attribute
                        return digits + 10;
                    default:  
                        return digits     
                } 
            }
            case "pan": {
                switch (coord) {
                    case 2: //z1 aka height attribute
                        let ht = digits - 5;
                        return ht > 0? ht : 1;
                    case 3: //z2 aka width attribute
                        let wid = digits - 5;
                        return wid > 0 ? wid : 1;
                    case 4: //z3 aka font-size
                        return (digits - 0.1).toFixed(2);
                    case 5: //z4 aka padding
                        let pad = digits - 1;
                        return pad > 0 ? pad : 1;
                    default: 
                        return digits;    
                } 
            }
            case "zoom": {
                switch (coord) {
                    case 2: //z1 aka height attribute
                        return digits + 5;
                    case 3: //z2 aka width attribute
                        return digits + 5;
                    case 4: //z3 aka font-size
                        return (digits + 0.1).toFixed(2);
                    case 5: //z4 aka padding
                        return digits + 1 ;
                    default: 
                        return digits;       
                } 
            }
            case "fadein": {
                switch (coord) {
                    case 6: //y attribute
                        return digits + 0.1;
                    default:
                        return digits       
                } 
            }
            case "fadeout": {
                switch (coord) {
                    case 6: //y attribute
                        return digits - 0.1;
                    default:  
                        return digits     
                } 
            }
        }
    }



    //move the currently clicked item
    moveMe = idx => {
        let { items } = this.state;
        //retrieve previous values as x,y
        let styles = items[idx].distance.split(';');
        let x = 0; let y = 0; let z1=20; let z2=70; let z3=1.1; let z4=5; let fade=0.2;
        let axiscount = 6;
        for ( var coord=0; coord<=axiscount; coord++ ){ //x,y,z1,z2,z3
            //recover the digits
            let digits = parseFloat(styles[coord].split(":")[1]);
            let direction = 'moveone';
            switch (coord) {
            case 0:
                x = this.morph( coord, digits, direction );
                break;
            case 1:
                y = this.morph( coord, digits, direction );
                break;
            case 2:
                z1 = this.morph( coord, digits, direction );
                break;
            case 3:
                z2 = this.morph( coord, digits, direction );
                break;
            case 4:
                z3 = this.morph( coord, digits, direction );
                break;
            case 5:
                z4 = this.morph( coord, digits, direction );
                break;
            case 6:
                fade = this.morph( coord, digits, direction );
                break;
            default:     
            }
        }
        items[idx].distance= this.combine(x,y,z1,z2,z3,z4,fade);
        this.setState({items})

    }
    //move all items
    move = e => {
        //get items array from state storage
        let { items } = this.state;
        //get operation: up down left right pan zoom
        const direction = e.target.value;
        const amount = 10;
        //recover the current axis values for each item and nudge them one way or the other:
        items.map( item => {
            let styles = item.distance.split(';');
            let x = 0; let y = 0; let z1=20; let z2=70; let z3=1.1; let z4=5; let fade=0.2;
            let axiscount = 6;
            for ( var coord=0; coord<=axiscount; coord++ ){ //x,y,z1,z2,z3
                //recover the digits
                let digits = parseFloat(styles[coord].split(":")[1]);  
                switch (direction) {
                    case 'up':
                        switch (coord) {
                            case 0:
                                x = this.morph( coord, digits, direction );
                                break;
                            case 1:
                                y = this.morph( coord, digits, direction );
                                break;
                            case 2:
                                z1 = this.morph( coord, digits, direction );
                                break;
                            case 3:
                                z2 = this.morph( coord, digits, direction );
                                break;
                            case 4:
                                z3 = this.morph( coord, digits, direction );
                                break;
                            case 5:
                                z4= this.morph( coord, digits, direction );
                                break;
                            case 6:
                                fade = this.morph( coord, digits, direction );
                                break;
                            default:     
                        }
                        break;
                        case 'down':
                            switch (coord) {
                                case 0:
                                    x = this.morph( coord, digits, direction );
                                    break;
                                case 1:
                                    y = this.morph( coord, digits, direction );
                                    break;
                                case 2:
                                    z1 = this.morph( coord, digits, direction );
                                    break;
                                case 3:
                                    z2 = this.morph( coord, digits, direction );
                                    break;
                                case 4:
                                    z3 = this.morph( coord, digits, direction );
                                    break;
                                case 5:
                                    z4= this.morph( coord, digits, direction );
                                    break;
                                case 6:
                                    fade = this.morph( coord, digits, direction );
                                    break;
                                default:     
                            }
                            break;
                        case 'left':
                                switch (coord) {
                                    case 0:
                                        x = this.morph( coord, digits, direction );
                                        break;
                                    case 1:
                                        y = this.morph( coord, digits, direction );
                                        break;
                                    case 2:
                                        z1 = this.morph( coord, digits, direction );
                                        break;
                                    case 3:
                                        z2 = this.morph( coord, digits, direction );
                                        break;
                                    case 4:
                                        z3 = this.morph( coord, digits, direction );
                                        break;
                                    case 5:
                                        z4= this.morph( coord, digits, direction );
                                        break;
                                    case 6:
                                        fade = this.morph( coord, digits, direction );
                                        break;
                                    default:     
                                }
                                break;
                        case 'right':
                                switch (coord) {
                                    case 0:
                                        x = this.morph( coord, digits, direction );
                                        break;
                                    case 1:
                                        y = this.morph( coord, digits, direction );
                                        break;
                                    case 2:
                                        z1 = this.morph( coord, digits, direction );
                                        break;
                                    case 3:
                                        z2 = this.morph( coord, digits, direction );
                                        break;
                                    case 4:
                                        z3 = this.morph( coord, digits, direction );
                                        break;
                                    case 5:
                                        z4= this.morph( coord, digits, direction );
                                        break;
                                    case 6:
                                        fade = this.morph( coord, digits, direction );
                                        break;
                                    default:     
                                }
                                break;
                        case 'zoom':
                                switch (coord) {
                                    case 0:
                                        x = this.morph( coord, digits, direction );
                                        break;
                                    case 1:
                                        y = this.morph( coord, digits, direction  );
                                        break;
                                    case 2:
                                        z1 = this.morph( coord, digits, direction  );
                                        break;
                                    case 3:
                                        z2 = this.morph( coord, digits, direction  );
                                        break;
                                    case 4:
                                        z3 = this.morph( coord, digits, direction  );
                                        break;
                                    case 5:
                                        z4= this.morph( coord, digits, direction );
                                        break;
                                    case 6:
                                        fade = this.morph( coord, digits, direction );
                                        break;
                                    default:     
                                }
                                break;
                        case 'pan':
                                switch (coord) {
                                    case 0:
                                        x = this.morph( coord, digits, direction);
                                        break;
                                    case 1:
                                        y = this.morph( coord, digits, direction );
                                        break;
                                    case 2:
                                        z1 = this.morph( coord, digits, direction );
                                        break;
                                    case 3:
                                        z2 = this.morph( coord, digits, direction );
                                        break;
                                    case 4:
                                        z3 = this.morph( coord, digits, direction );
                                        break;
                                    case 5:
                                        z4= this.morph( coord, digits, direction );
                                        break;
                                    case 6:
                                        fade = this.morph( coord, digits, direction );
                                        break;
                                    default:     
                                }
                                break;
                        case 'fadein':
                                switch (coord) {
                                    case 0:
                                        x = this.morph( coord, digits, direction );
                                        break;
                                    case 1:
                                        y = this.morph( coord, digits, direction );
                                        break;
                                    case 2:
                                        z1 = this.morph( coord, digits, direction );
                                        break;
                                    case 3:
                                        z2 = this.morph( coord, digits, direction );
                                        break;
                                    case 4:
                                        z3 = this.morph( coord, digits, direction );
                                        break;
                                    case 5:
                                        z4= this.morph( coord, digits, direction );
                                        break;
                                    case 6:
                                        fade = this.morph( coord, digits, direction );
                                    default:     
                                }
                                break;
                        case 'fadeout':
                                switch (coord) {
                                    case 0:
                                        x = this.morph( coord, digits, direction );
                                        break;
                                    case 1:
                                        y = this.morph( coord, digits, direction );
                                        break;
                                    case 2:
                                        z1 = this.morph( coord, digits, direction );
                                        break;
                                    case 3:
                                        z2 = this.morph( coord, digits, direction );
                                        break;
                                    case 4:
                                        z3 = this.morph( coord, digits, direction );
                                        break;
                                    case 5:
                                        z4= this.morph( coord, digits, direction );
                                        break;
                                    case 6:
                                        fade = this.morph( coord, digits, direction  );
                                    default:     
                                }
                                break;
                }
                item.distance = this.combine(x,y,z1,z2,z3,z4,fade);
            }
        })
        this.setState({items})
    }
    //trick: index (idx) is used to directly update state value
    render({ }, { items }) {
        return (
            <div style="border:1px solid black; padding:5px;">
                <h1>Data Driven Floaters 3df</h1> 
                <div style="border:1px solid black;height:100px;">&nbsp;
                    <div class="posRel">
                    { items.map( (item, idx) => ( 
                        <div class="horizontalList overflowScroll fade" style={item.distance} title={item.title} >
                            {item.label}
                            <div idx={idx} style="font-size:.7em" onClick={() => this.moveMe(idx) }>{item.distance}</div>
                        </div>
                    )) } 
                    </div> 
                </div>
                <p style="margin-top:20px;">------- C o n t r o l s -------------</p>  
                <button style="margin-left: 10px;" value="left" onClick={this.move}>Move Boats Left</button>
                <button style="margin-left: 10px;" value="right" onClick={this.move}>Move Boats Right</button>
                <button style="margin-left: 10px;" value="up" onClick={this.move}>Move Boats Up</button>
                <button style="margin-left: 10px;" value="down" onClick={this.move}>Move Boats Down</button>
                <button style="margin-left: 10px;" value="pan" onClick={this.move}>Pan</button>
                <button style="margin-left: 10px;" value="zoom" onClick={this.move}>Zoom</button>
                <button style="margin-left: 10px;" value="fadein" onClick={this.move}>Fade In</button>
                <button style="margin-left: 10px;" value="fadeout" onClick={this.move}>Fade Out</button>

            </div>
        );
    }

}