// Data file
DATA_FILE = "data_public.js"; // default, answers for development, no answer for test

// Variables for the filters with the number of questions
let number_options = [1, 20, 50, 100, 150, 200];  
let splits = ["All", "train (2560)", "test (640)"];    
let topic = [
    "All",
    "Investment",
    "Quantitative Methods",
    "Valuation and Risk Models",
    "Financial Markets and Products",
    "Financial Reporting and Analysis",
    "Portfolio Management",
    "Fixed Income",
    "Credit Risk",
    "Foundation of Risk Management",
    "Economics",
    "Operational Risk",
    "Derivatives",
    "Market Risk",
    "Corporate Finance",
    "Liquidity and Treasury Risk"
]



// Elements in the Option Panel
let optbtn = document.getElementsByClassName("optionsbtn")[0];
let closebtn = document.getElementsByClassName("closebtn")[0];
let optionpanel = document.getElementById("option-panel");
let optboxes = document.getElementsByClassName("optbox");
let opt_dds = document.getElementsByClassName("opt-dd");
let filter_submit = document.getElementById("filter-submit");

// Element Text the Option Panel
let number_dd = make_dropdown("How many samples?", number_options, "number_dd");
let split_dd = make_dropdown("Choose a split:", splits, "split_dd");
let topic_dd = make_dropdown("Choose a topic:", topic, "topic_dd");

// Content in the Option Box
optboxes[0].innerHTML += number_dd;
optboxes[0].innerHTML += split_dd;
optboxes[0].innerHTML += topic_dd;

// Elements in the Content Body
let body = document.getElementById("content-body");
let display = document.getElementById("display");

// Click actions for the option buttons
optbtn.addEventListener("click", openNav);
closebtn.addEventListener("click", closeNav);

// Responsive: if screen is narrow, body only displays one column
if (window.innerWidth < 600) {
    body.style.flexDirection = "column";
}

// Set up the data filters and display the page
let filters = {};

for (each of opt_dds) {
    each.addEventListener("change", change_filters);
}

// Display the page when clicking the fresh button
filter_submit.addEventListener("click", filter_data);
if (window.innerWidth < 600) {
    filter_submit.addEventListener("click", closeNav);
}

// Display the page when it is running at the first time
filter_data();

// Functions
var display_padding = display.style.padding;
function openNav() {
    if (window.innerWidth < 600) {
        // optionpanel.style.zIndex = "2";
        optionpanel.style.width = "100vw";
        display.style.width = "0vw";
        display.style.padding = "0";
    } else {
        optionpanel.style.width = "30vw";
        display.style.width = "50vw";
    }
    for (each of optionpanel.children) 
        each.style.display = "block";
}

function closeNav() {
    // display.style.display = "block";
    optionpanel.style.width = "0vw";
    display.style.width = "100vw";
    display
    for (each of optionpanel.children) {
        each.style.display = "none";
    }
}

// Function: update the filter values
function change_filters(e) {
    filters.split = document.getElementById("split_dd").value;
    filters.number = document.getElementById("number_dd").value;
    filters.topic = document.getElementById("topic_dd").value;
    // console.log(filters);
}

// Function: draw the page
function create_page(d) {
    if (d.length === 0) {
        body.innerHTML = "<p>No number satisfies All the filters.</p>";
    } else {
        body.innerHTML = create_col(d);
    }
    reflow(body);
    console.log("reflowed");
    renderKaTeX(); // Call to render KaTeX
    console.log("Reflowed and rendered KaTeX");
}

function create_col(data) {
    res = [];

    for (each of data) {
        res.push(create_number(each));
    }

    return `<div class="display-col"> ${res.join("")} </div>`;
}

// data is an object with the following attr.
function create_number(data) {
    let question_text = make_qt(data);
    
    // if the ground_truth attr is not null, then make the answer

    let answer = "";
    if (data.Answer !== null)
        answer = make_answer(data.Answer);

    let options = "";
    if (data.Options !== null)
        options = make_options(data.Options);

    let share_image = "";
    if (data["Share Image"] !== null) {
        share_image = make_up_image(data["Share Image"]);
    }

    let up_image = "";
    if (data.Image !== null)
        up_image = make_up_image(data.Image);

    let explaination = "";
    if (data.Explanation !== null)
        explaination = make_explaination(data.Explanation);


    html = make_box([question_text, share_image, up_image, options, answer, explaination]) + "<hr/>";

    return html;
}

// creates a div with question text in it
function make_qt(data) {
    let html = "";
    html = `
        <div class="question-container">
            <p><b>Question</b></p>
            <p class="question-txt">[No.${data["ID"]}] ${data["Question Text"]}</p>
        </div>
    `;
    return html;
}

function make_up_image(image) {
    return `<img src="${image}" class="question-image" style="max-width: 60%; height: auto;" />`;
}

function make_options(Options) {
    let optionsHtml = `<p class="options-txt"><b>Options:</b></p><ul>`;
    for (const [key, value] of Object.entries(Options)) {
        optionsHtml += `<p>${key} : ${value}</p>`;
    }
    optionsHtml += `</ul>`;
    return optionsHtml;
}

function make_explaination(content) {
    // Replace line breaks with <br/> for HTML rendering
    console.log(typeof content);
    const formattedContent = content.replace(/\n/g, '<br/>');
    
    return `
    
        <div class="feedback-section">
            <p><b>${"Explaination"}</b></p>
            <p>${formattedContent}</p>
        </div>
    `;
}


function make_box(contents, cls = "") {
    if (contents.join("").length === 0) return "";
    let html = `
        <div class="box ${cls}"> 
            ${contents.join(" ")}
        </div>
    `;
    return html;
}


function make_answer(Answer) {
    let html = `<p><b>Answer </b></p><p class="answer-txt">${Answer}</p><hr class="dashed-line" />`;
    return html;
}

function make_dropdown(label, options, id, default_ind = 0) {
    let html = "";
    for (let i = 0; i < options.length; i++) {
        if (i === default_ind)
            html += `<option value="${options[i]}" selected> ${options[i]} </option>`;
        else
            html += `<option value="${options[i]}"> ${options[i]} </option>`;
    }
    html = `<label class="dd-label">${label} <select id="${id}" class="opt-dd"> ${html} </select> </label><br/>`;
    return html;
}

// Main Functions (FIXME: need to be updated)
async function filter_data() {
    // set up or update the filter
    change_filters();

    console.log(filters);
    // e.g. data/{"dataset": "CLEVR-Math", "number": 20}

    // success event 
    let scriptEle = document.createElement("script");
    // scriptEle.setAttribute("src", `data/${filters.dataset}_test.js`);
    scriptEle.setAttribute("src", `data/${DATA_FILE}`);
    scriptEle.setAttribute("type", "text/javascript");
    scriptEle.setAttribute("async", false);
    document.body.appendChild(scriptEle);

    scriptEle.addEventListener("load", () => {
        console.log("File loaded");
        res = test_data;
        // console.log(res);


        // go over res and add pid to each element
        for (let i of Object.keys(res)) {
            res[i].pid = i;
        }

        // Filter: split
        filters.split = filters.split.split(" (")[0];
        if (filters.split !== "All") {
            for (let i = test_data.length - 1; i >= 0; i--) {
                if (test_data[i]["Datasplit"] !== filters.split) {
                test_data.splice(i, 1);
                }
            }
        }

        // Filter: topic
        filters.topic = filters.topic.split(" (")[0];
        if (filters.topic !== "All") {
            for (let i = test_data.length - 1; i >= 0; i--) {
                if (test_data[i]["General Topics"] !== filters.topic) {
                test_data.splice(i, 1);
            }
        }
    }

        // filter: number
        cnt = filters.number;
        if (cnt != "All") {
            cnt = Number.parseInt(cnt);
            d = _.sample(res, Math.min(cnt, Object.keys(res).length));

        } else {
            d = [];
            for (let i of Object.keys(res)) {
                d.push(res[i]);
            }
        }
        create_page(d);
    });
}

// force the browser to reflow
function reflow(elt) {
    elt.offsetHeight;
}

function renderKaTeX() {
    if (typeof renderMathInElement === 'function') {
        renderMathInElement(document.body, {
            delimiters: [
                { left: '$$', right: '$$', display: true },
                { left: '$', right: '$', display: false },
            ]
        });
    }
}