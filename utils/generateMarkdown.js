// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string

const badges = {
    Apache_2: {     segment: "Apache_2.0-blue.svg",           url: "https://opensource.org/licenses/Apache-2.0" },
    Boost_1: {      segment: "Boost_1.0-lightblue.svg",       url: "https://www.boost.org/LICENSE_1_0.txt" } ,
    BSD_3: {        segment: "BSD_3--Clause-blue.svg",        url: "https://opensource.org/licenses/BSD-3-Clause" }   ,
    CC0_1: {        segment: "CC0_1.0-lightgrey.svg",         url: "http://creativecommons.org/publicdomain/zero/1.0/" }   ,
    CC_4: {         segment: "CC_BY_4.0-lightgrey.svg",       url: "https://creativecommons.org/licenses/by/4.0/" }    ,
    CC_SA: {        segment: "CC_BY--SA_4.0-lightgrey.svg",   url: "https://creativecommons.org/licenses/by-sa/4.0/" }   ,
    CC_NC: {        segment: "CC_BY--NC_4.0-lightgrey.svg",   url: "https://creativecommons.org/licenses/by-nc/4.0/" }   ,
    CC_ND: {        segment: "CC_BY--ND_4.0-lightgrey.svg",   url: "https://creativecommons.org/licenses/by-nd/4.0/" }   ,
    EPL_1: {        segment: "EPL_1.0-red.svg",               url: "https://opensource.org/licenses/EPL-1.0" } ,
    GPLv3: {        segment: "GPLv3-blue.svg",                url: "https://www.gnu.org/licenses/gpl-3.0" } ,
    AGPL_v3: {      segment: "AGPL_v3-blue.svg",              url: "https://www.gnu.org/licenses/agpl-3.0" } ,
    LGPL_v3: {      segment: "LGPL_v3-blue.svg",              url: "https://www.gnu.org/licenses/lgpl-3.0" } ,
    FDL_v1: {       segment: "FDL_v1.3-blue.svg",             url: "https://www.gnu.org/licenses/fdl-1.3" }  ,
    Hippocratic_3: {segment: "Hippocratic_3.0-lightgrey.svg", url: "https://firstdonoharm.dev" } ,
    IPL_1: {        segment: "IPL_1.0-blue.svg",              url: "https://opensource.org/licenses/IPL-1.0" } ,
    ISC: {          segment: "ISC-blue.svg",                  url: "https://opensource.org/licenses/ISC" } ,
    MIT: {          segment: "MIT-yellow.svg",                url: "https://opensource.org/licenses/MIT" } ,
    MPL_2: {        segment: "MPL_2.0-brightgreen.svg",       url: "https://opensource.org/licenses/MPL-2.0" } ,
    ODC_BY: {       segment: "ODC_BY-brightgreen.svg",        url: "https://opendatacommons.org/licenses/by/" }  ,
    ODbL: {         segment: "ODbL-brightgreen.svg",          url: "https://opendatacommons.org/licenses/odbl/" } ,
    PDDL: {         segment: "PDDL-brightgreen.svg",          url: "https://opendatacommons.org/licenses/pddl/" } ,
    Perl: {         segment: "Perl-0298c3.svg",               url: "https://opensource.org/licenses/Artistic-2.0" } ,
    Artistic_2: {   segment: "Artistic_2.0-0298c3.svg",       url: "https://opensource.org/licenses/Artistic-2.0" } ,
    OFL_1: {        segment: "OFL_1.1-lightgreen.svg",        url: "https://opensource.org/licenses/OFL-1.1" } ,
    Unlicense: {    segment: "Unlicense-blue.svg",            url: "http://unlicense.org/" } ,
    WTFPL: {        segment: "WTFPL-brightgreen.svg",         url: "http://www.wtfpl.net/about/" }   ,
    Zlib: {         segment: "Zlib-lightgrey.svg",            url: "https://opensource.org/licenses/Zlib" }    ,
}


//  ------------------------------------------------------------------------------------------------------------------------------
// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(segment) {  
    if (!segment) { return '' }
    return `https://img.shields.io/badge/${segment}`
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(link) {
    if (!link) { return '' }
    return `(${link})`
}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(key, licenseName) {
    if (!licenseName) { return '' }
    const link = renderLicenseLink(badges[licenseName].url)
    const badge = renderLicenseBadge(badges[licenseName].segment)
    return `## License  
    \n[![License](${badge})]${link}
    \nThis project is licensed under the ${licenseName} License - see the [LICENSE]${link} for details.
    `
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {

    const lorem = `Lorem sed voluptua voluptua sit diam lorem, clita sadipscing et nonumy vero dolore eos sit et, takimata sanctus takimata et est aliquyam et. Sea et sed consetetur ea amet sit amet at sit, consetetur ut est et et takimata lorem.`
    let { project_name, github_username, email } = data

    // deleting unneeded data
    Object.keys(data).forEach((key)=> (key != 'project_name' && data[key] == 'no') && delete data[key] )

    // setting fallbacks
    Object.entries(data).forEach(([key, val]) => {
        if(typeof val != 'string') return
        const fallbacks = {
            description: 'This is a description', 
            features: `\n- **Features 1:** Lorem sed voluptua voluptua sit diam lorem,. \n- **Features 2:** Lorem sed voluptua voluptua sit diam lorem,. \n- **Features 3:** Lorem sed voluptua voluptua sit diam lorem,`, 
            technologies: `Technologies used: \n- **HTML** \n- **css** \n- **Javascript**`, 
            getting_started: 'Getting started:',
            license: 'MIT', 
            instalation: 'npm install', 
            usage: 'npm start', 
            contribution: 'Contributions are welcome',
            questions: `Please email me at ${email}`, 
            test_instructions: 'npm test', 
            acknowledgments: 'Thank you to all contributors',
        }
        data[key] = fortmatInput(data[key], fallbacks[key])
    })

    console.log(ln(), data)     

    const sections = [ 
        'description', 'table_of_content', 'features', 'technologies', 'getting_started', 'contribution', 
        'acknowledgments', 'questions', 'tests', 'instalation', 'usage', 'license',
    ]

    // createing table_of_content links
    const table_of_content = []
    Object.keys(data).forEach(key => {
        if(key == 'description') return
        if(sections.includes(key)){
            const link = `[${formatTitle(key)}](#${key.replace('_','-')})`
            table_of_content.push(link)
        }
    })
    data.table_of_content = table_of_content

    // defining order of sections
    let orderedObj = {
        'description':data.description, 
        'table_of_content':data.table_of_content,
    }
    Object.keys(orderedObj).forEach(key => delete data[key])
    orderedObj = { ...orderedObj, ...data}

    const templates = {
        description: (key, val) => {
            const projectTitle = project_name == "yes" ? 'My Project' : project_name
            return `# ${projectTitle} 
            \n![screenshot](screenshot.png) 
            \n## Description
            \n${lorem} 
            \nApplication is live at: https://example.com `
        },

        table_of_content: (key, val)=> {
            const links = val.reduce((acc, cur)=> acc + `\n- ${cur}`,'')
            return `## Table of Content ${links}`
        },

        license: (key, val) => renderLicenseSection(key, val),
    }

    // creating markdown
    let markdown = ''
    Object.entries(orderedObj).forEach(([key, value]) => {
        
        if(Object.keys(templates).includes(key)) {
            markdown += templates[key](key, value) + '\n\n\n'
        } else if(sections.includes(key)){
            markdown += `## ${formatTitle(key)} \n${value} \n\n\n`
        }
    })

    return markdown
}

function fortmatInput(val, falback){
    return (val == 'yes' || val == '') ? capFirst(falback) : capFirst(val)
}

function capFirst(str){
    if(!str) return ''
    return str[0].toUpperCase() + str.slice(1)
}

function c(str, color = 'g'){ 
    const colors = require('colors')
    const opt = { r: 'red', g: 'green', y: 'yellow', b: 'blue' }
    return colors[opt[color]](str) 
}

function ln() {
    const e = new Error()
    const frame = e.stack.split("\n")[2]
    const lineNumber = frame.match(/:(\d+):\d+\)?$/)[1]
    return c(`line ${lineNumber}`,'r')
}

function formatTitle(str){
    str = str.split('_')
    str = str.map(s=>s[0].toUpperCase() + s.slice(1))
    return str.join(' ')
}

module.exports = { generateMarkdown, badges, ln }
