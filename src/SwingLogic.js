let x = 0, y = 0, z = 0, count1 = 0, count2 = 0, backlift_angle = 0, follow_through_angle = 0, wagon, velocity = 0, temp = 0;
let Y = [], X = [], Z = [], A_MAG = [], TIME = [], negative_to_positve = [], positive_to_negative = [], strikes = [], swings = [];
let swing = {};

export default function evaluate(x, y, z, ax, ay, az) {
    console.log("inside eval calculating swing....")

    Y.push(y);
    X.push(x);
    Z.push(z);
    TIME.push(Date.now());
    
    let a = calculate_accelerartion(ax, ay, az);
    A_MAG.push(a);
    if (Y[Y.length - 2] > 0 && y < 0) {



        positive_to_negative.push(Y.length - 1);

        count1 = count1 + 1;
    }
    if (Y[Y.length - 2] < 0 && y >= 0 && count1 == 1) {
        negative_to_positve.push(Y.length - 1);
        count2 = count2 + 1;
    }

    if (count1 == 1 && count2 == 1 && a >= 5 && y >= 0) {

        console.log(Y.length - 1);
        backlift_angle = find_backlift(positive_to_negative[0], negative_to_positve[0]);
        console.log(backlift_angle)
        velocity = Number(calculate_velocity(positive_to_negative[0], negative_to_positve[0]));
        negative_to_positve = [];
        positive_to_negative = [];
        count1 = 0;
        count2 = 0;

        swing = { "backklift": backlift_angle, "velocity": Math.abs(velocity), "time_of_impact": Date.now(), "current y index": Y.length - 1 };

        console.log("===>",swing);




    }
    // if(count1==1 && count2== 1 && Y[Y.length-2]  <  Y[Y.length-3]  && Y[Y.length-2] < y){
    //     console.log("follow through is :")
    //     console.log()
    // }
}

function calculate_velocity(i, t) {
    let abc = Number(40.5 * (Math.cos(90 - Math.abs(Y[i])) - Math.cos(90 - Y[t])));

    return abc;
}

function find_backlift(i, t) {


    let temp = Y.slice(i, t);
    let min = Math.min(...temp);
    let xyz = Math.abs(min) + 90;
    return xyz;

}

function calculate_accelerartion(x, y, z) {

    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
}