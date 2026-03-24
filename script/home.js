
const createElement=(arr)=>{

   const htmlElements=arr.map(elem=>`<p class="py-1 px-2 bg-[#FDE68A] rounded-md">${elem.toUpperCase()}</p>`)

   return htmlElements.join(' ');
};

const btnTabClicked=(id)=>{
    
    console.log(id);

    // will have to remove styles and then give style to the needed one
    document.getElementById('all-btn-tab').classList.remove('bg-[#4A00FF]', 'text-white');
    document.getElementById('open-btn-tab').classList.remove('bg-[#4A00FF]', 'text-white');
    document.getElementById('closed-btn-tab').classList.remove('bg-[#4A00FF]', 'text-white');

    // will add all only default styles
    document.getElementById('all-btn-tab').classList.add('bg-white', 'shadow-md', 'text-[#64748B]');
    document.getElementById('open-btn-tab').classList.add('bg-white', 'shadow-md', 'text-[#64748B]');
    document.getElementById('closed-btn-tab').classList.add('bg-white', 'shadow-md', 'text-[#64748B]');

    // now add it back for element thats clicked on
    document.getElementById(id).classList.remove('bg-white', 'shadow-md', 'text-[#64748B]');
    document.getElementById(id).classList.add('bg-[#4A00FF]', 'text-white');

    // now comes the filtering part
    if(id=='all-btn-tab'){
        // just simply show it
        fetchAll();
    }
    else if(id=='open-btn-tab'){

        // will have to filter and then display
        filterOpen();
    }
    else{
        // filter based on closed
        filterClosed();
    }
}

const issueCount=(data)=>{

    const countIssue=document.getElementById('issue-count');
    countIssue.innerText=`${data.length} Issues`
}

const fetchAll=()=>{

    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then((res)=>res.json())
    .then(data=>displayData(data.data))
};

const filterClosed=()=>{
     fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then((res)=>res.json())
    .then((data)=>{

        const openFilter=data.data.filter((elem)=>elem.status==="closed");
        displayData(openFilter);
    });
}

const filterOpen=()=>{
     fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then((res)=>res.json())
    .then((data)=>{

        const openFilter=data.data.filter((elem)=>elem.status==="open");
        displayData(openFilter);
    });
}

const displayData=(data)=>{
    console.log(data);
    issueCount(data);
    document.getElementById('spinner').classList.remove('hidden');
    // now show the data
    const cardContainer=document.getElementById('card-container');
    cardContainer.innerHTML="";

    // assignee: "jane_smith"
    // author: "john_doe"
    // createdAt: "2024-01-15T10:30:00Z"
    // description: "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior."
    // id: 1
    // labels: (2) ['bug', 'help wanted']
    // priority: "high"
    // status: "open"
    // title: "Fix navigation menu on mobile devices"
    // updatedAt: "2024-01-15T10:30:00Z"

    data.forEach((elem)=>{
        // create a card
        const githubCard=document.createElement('div');
        const status=elem.status;// find the status and then based on that
        const borderColour=elem.status==="open" ? "#00A96E" : "#A855F7";
        const imagePath=borderColour==="#00A96E" ? "./assets/Open-Status.png" : "./assets/Closed- Status .png";
        // console.log(borderColour);
        // console.log(imagePath);
        console.log(elem.status);
        

        let priorityClass="";

        if(elem.priority==="high"){
            priorityClass="text-[#EF4444] bg-[#FEECEC]";
        }
        else if(elem.priority==="medium"){
            priorityClass="text-[#F59E0B] bg-[#FFF6D1]";
        }
        else{
            priorityClass="text-[#9CA3AF] bg-[#EEEFF2]";
        }
        
        githubCard.innerHTML=`
            
        <div class="github-card bg-white shadow-md p-4 border-t-4 border-t-[${borderColour}] rounded-md">
                
                <div class="flex justify-between items-center mb-3">
                    <img src="${imagePath}" alt="">
                    <p class="${priorityClass} py-1 px-7 rounded-xl">${elem.priority.toUpperCase()}</p>
                </div>
               <h2 class="font-semibold text-[#1F2937]">${elem.title}</h2>
                <p class="mt-2 mb-3 text-sm text-[#64748B]">${elem.description}</p>

                <div class="flex gap-1 items-center mb-3">
                    ${createElement(elem.labels)}
                   
                </div>

                <div>
                    <p class="mb-2 text-sm text-[#64748B]">#1 by ${elem.author}</p>
                    <p class="mb-2 text-sm text-[#64748B]">${elem.createdAt}</p>
                </div>
            </div>
        `;
        
        cardContainer.appendChild(githubCard);
    })

    document.getElementById('spinner').classList.add('hidden');
    
};

fetchAll();