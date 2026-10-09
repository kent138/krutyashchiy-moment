import fs from 'node:fs/promises';import {execFileSync} from 'node:child_process';
for(const file of ['public/app.js','public/admin.js','public/data.js','public/store.js','api/lead.js'])execFileSync(process.execPath,['--check',file]);
const html=await fs.readFile('public/index.html','utf8');for(const id of ['services','calculator','booking','status','about','contacts'])if(!html.includes('id="'+id+'"'))throw Error('Missing section '+id);if(html.includes('Lorem ipsum'))throw Error('Placeholder copy');console.log('Syntax and required sections: OK');
