import { Component } from 'preact';
export default class Floater3dfr extends Component {
    state = { items: [
        {ident: 1, label: "Beach LT", distance: "left:10px; top:20px; height:30px; width:80px; font-size:1.1em; padding: 5px; opacity:.2; transform: rotate(40deg); background-color: #FFF;", title:"A 1 person foldable canoe. 300lbs max"},
        {ident: 2, label: "Bay ST", distance: "left:80px; top:-20px; height:30px; width:80px; font-size:1.1em; padding: 1px; opacity:.4; transform: rotate(1deg); background-color: #0FF;", title:"A 1 person foldable kayak. 300lbs max"},
        {ident: 3, label: "Coast XT", distance: "left:300px; top:0px; height:25px; width:90px; font-size:1.1em; padding: 15px; opacity:.8; transform: rotate(20deg); background-color: #0F0;",  title:"A 1 person plus gear kayak. 400lbs max."},
        {ident: 4, label: "Haven", distance: "left:500px; top:10px; height:25px; width:120px; font-size:1.1em; padding: 15px; opacity:.9; transform: rotate(70deg); background-color: #F00;",  title:"A 2 person kayak. 400lbs max."}
        ] };

        //
    combine = (x, y, z1, z2, z3, z4, fade, rotation, backgroundColor) => {
        return "left:" + x + "px; top:" + y + "px; height:" + z1 + "px; width:" + z2 + "px; font-size:"+z3+"em; padding:" + z4  + "px; opacity:" + fade + "; transform: rotate(" + rotation + "deg); background-color: #" + backgroundColor.toUpperCase();
    }

    extractDigits = ( styles, coord ) => {
        if ( coord == 8 ) { //#RGB
            return styles[coord].split(":")[1].replace(/[^0-F\-\.]/g,"");
        } else {
            return  parseFloat(styles[coord].split(":")[1].replace(/[^0-9\-\.]/g,"") );
        }
    }

    adjustColor = ( digits ) => {
        let tva = digits.split("");
        for (var k = 0; k < 3; k++) {
            tva[k] = parseInt(tva[k], 16) + k;
            if ( tva[k] > 15 ) tva[k] = '0';
            tva[k] = tva[k].toString(16)
            if ( tva[k] < 0 ) tva[k] = 15;
            tva[k] = tva[k].toString(16)
        }
        let tv = tva[0] + " "+ tva[1] + " " +  tva[2] + " " +tva.join('');
        return tva.join('');
    }

    morph = (coord, digits, opcode) => {
        switch(opcode) {
            //clicking on an element cnanges each attribute slightly
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
                        let tv = digits - 0.1;
                        if (tv < 0) tv=0.1;
                        return tv;
                    case 7: //rotation
                        return digits + 10;
                    case 8: //backgroundColor
                        return this.adjustColor(digits);
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
                    case 6: //f attribute
                        let tv = digits + 0.1;
                        if ( tv > 1 ) tv = 1;
                        return tv;
                    default:
                        return digits       
                } 
            }
            case "fadeout": {
                switch (coord) {
                    case 6: //f attribute
                        let tv = digits - 0.1;
                        if (tv <= 0.09) tv=0.01;
                    return tv;
                        return digits - 0.1;
                    default:  
                        return digits     
                } 
            }
            case "rotateCW": {
                switch (coord) {
                    case 7: //r attribute
                        return digits + 10;
                    default:  
                        return digits     
                } 
            }
            case "rotateCCW": {
                switch (coord) {
                    case 7: //r attribute
                        return digits - 10;
                    default:  
                        return digits     
                } 
            }
            case "backgroundColor": {
                switch (coord) {
                    case 8: //bgColor attribute
                        return this.adjustColor(digits);
                    default:  
                        return digits;     
                } 
            }
        }
    }



    //move the currently clicked item
    moveMe = e => {
        let { items } = this.state;
        const idx = e.target.attributes.idx.value;
        //retrieve previous values as x,y
        let styles = items[idx].distance.split(';');
        let x = 0; let y = 0; let z1=20; let z2=70; let z3=1.1; let z4=5; let fade=0.2; let rotation=0.0; let backgroundColor='#FFF';
        let axiscount = 8;
        for ( var coord=0; coord<=axiscount; coord++ ){ //x,y,z1,z2,z3,r
            //get digits
            let digits = this.extractDigits(styles, coord);
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
            case 7:
                rotation = this.morph( coord, digits, direction );
                break;
            case 8:
                backgroundColor = this.morph( coord, digits, direction );
                break;
            default:     
            }
        }
        items[idx].distance= this.combine(x,y,z1,z2,z3,z4,fade, rotation, backgroundColor);
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
            let x = 0; let y = 0; let z1=20; let z2=70; let z3=1.1; let z4=5; let fade=0.2; let rotation=0.0; let backgroundColor='#FFF';
            let axiscount = 8;
            for ( var coord=0; coord<=axiscount; coord++ ){ //x, y, z1, z2, z3,z4, r
                let digits = this.extractDigits(styles, coord);
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
                            case 7:
                                rotation = this.morph( coord, digits, direction );
                                break;
                            case 8:
                                backgroundColor = this.morph( coord, digits, direction );
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
                            case 7:
                                rotation = this.morph( coord, digits, direction );
                                break;
                            case 8:
                                backgroundColor = this.morph( coord, digits, direction );
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
                            case 7:
                                rotation = this.morph( coord, digits, direction );
                                break;
                            case 8:
                                backgroundColor = this.morph( coord, digits, direction );
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
                            case 7:
                                rotation = this.morph( coord, digits, direction );
                                break;
                            case 8:
                                backgroundColor = this.morph( coord, digits, direction );
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
                            case 7:
                                rotation = this.morph( coord, digits, direction );
                                break;
                            case 8:
                                 backgroundColor = this.morph( coord, digits, direction );
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
                            case 7:
                                rotation = this.morph( coord, digits, direction );
                                break;
                            case 8:
                                backgroundColor = this.morph( coord, digits, direction );
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
                            case 7:
                                rotation = this.morph( coord, digits, direction );
                                break;
                            case 8:
                                backgroundColor = this.morph( coord, digits, direction );
                                break;
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
                            case 7:
                                rotation = this.morph( coord, digits, direction );
                                break;
                            case 8:
                                backgroundColor = this.morph( coord, digits, direction );
                                break;
                            default:     
                        }
                        break;
                    case 'rotateCW':
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
                            case 7:
                                rotation = this.morph( coord, digits, direction );
                                break;
                            case 8:
                                backgroundColor = this.morph( coord, digits, direction );
                                break;
                            default:     
                        }
                        break;
                    case 'rotateCCW':
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
                                break;
                            case 7:
                                rotation = this.morph( coord, digits, direction );
                                break;
                            case 8:
                                backgroundColor = this.morph( coord, digits, direction );
                                break;
                            default:     
                        }
                        break;
                case 'backgroundColor':
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
                                break;
                            case 7:
                                rotation = this.morph( coord, digits, direction );
                                break;
                            case 8:
                                backgroundColor = this.morph( coord, digits, direction );
                                break;
                            default:     
                        }
                        break;
                }
                item.distance = this.combine(x,y,z1,z2,z3,z4,fade,rotation, backgroundColor);
            }
        })
        this.setState({items})
    }
    //trick: index (idx) is used to directly update state value
    render({ }, { items }) {
        return (
            <div style="border:1px solid black; padding:5px;">
                <h1>Data Driven Floaters 3dfrb</h1> 
                <div style="border:1px solid black;height:100px;">&nbsp;
                    <div class="posRel">
                    { items.map( (item, idx) => ( 
                        <div class="horizontalList overflowScroll" style={item.distance} title={item.title} >
                            {item.label}
                            <div idx={idx} style="font-size:.7em" onClick={this.moveMe}>{item.distance}</div>
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
                <button style="margin-left: 10px;" value="rotateCW" onClick={this.move}>Rotate CW</button>
                <button style="margin-left: 10px;" value="rotateCCW" onClick={this.move}>Rotate CWW</button>
                <button style="margin-left: 10px;" value="backgroundColor" onClick={this.move}>Background Color Shift</button>

            </div>
        );
    }

}