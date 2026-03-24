
const createElement=(arr)=>{

   const htmlElements=arr.map(elem=>`<p class="py-1 px-2 bg-[#FDE68A] rounded-md">${elem.toUpperCase()}</p>`)

   return htmlElements.join(' ');
};

const manageSpinner=(status)=>{
    
    
    if(status==true){
        document.getElementById('spinner').classList.remove('hidden');
        document.getElementById('card-container').classList.add('hidden');
    }
    else{
         document.getElementById('spinner').classList.add('hidden');
        document.getElementById('card-container').classList.remove('hidden');
    }
}

const loadCardDetail=async(id)=>{
    const url=`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;

    

    const res=await fetch(url); 
    const data=await res.json();
    displayCardDetails(data.data);
    
    
}

const displayCardDetails=(card)=>{
    // will return an object
    console.log(card);
    
    const detailsBox=document.getElementById('details-container');

    detailsBox.innerHTML="";
    document.getElementById('card_modal').showModal();

    detailsBox.innerHTML=`
        <h2 class="text-2xl font-bold">${card.title}</h2>
                <div class="flex gap-3 items-center mt-2 mb-6">
                    <p class="p-1 text-white bg-[#00A96E] rounded-md">Opened</p>
                    <p class="text-xs text-[#64748B]">Opened by ${card.author}</p>
                    <p class="text-xs text-[#64748B]">${card.createdAt}</p>
                </div>

                 <div class="flex gap-1 items-center mb-6">
                    ${createElement(card.labels)}
                </div>

                <p class="text-[#64748B] mb-6">${card.description}</p>

                <div class="flex gap-8 bg-[#F8FAFC] p-4 items-center">
                    <div>
                        <p class="text-[#64748B]">Assignee:</p>
                        <h3 class="font-semibold text-[#1F2937]">${card.assignee}</h3>
                    </div>

                    <div >
                         <p class="text-[#64748B]">Priority:</p>
                         <p class="p-1 text-white bg-[#EF4444] rounded-md text-center">${card.priority}</p>
                    </div>
                </div>
    `;
}

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

     manageSpinner(true);

    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then((res)=>res.json())
    .then(data=>displayData(data.data))
};

const filterClosed=()=>{

     manageSpinner(true);

     fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then((res)=>res.json())
    .then((data)=>{

        const openFilter=data.data.filter((elem)=>elem.status==="closed");
        displayData(openFilter);
    });
}

const filterOpen=()=>{

     manageSpinner(true);

     fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then((res)=>res.json())
    .then((data)=>{

        const openFilter=data.data.filter((elem)=>elem.status==="open");
        displayData(openFilter);
    });
}

const displayData=(data)=>{
    issueCount(data);
   
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
        // console.log(elem.status);
        

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
            
        <div onclick="loadCardDetail(${elem.id})" class="github-card bg-white shadow-md p-4 border-t-4 border-t-[${borderColour}] rounded-md">
                
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

    manageSpinner(false);
    
};

fetchAll();

document.getElementById('btn-search').addEventListener("click",function(){

    // will have to remove styles and then give style to the needed one
    document.getElementById('all-btn-tab').classList.remove('bg-[#4A00FF]', 'text-white');
    document.getElementById('open-btn-tab').classList.remove('bg-[#4A00FF]', 'text-white');
    document.getElementById('closed-btn-tab').classList.remove('bg-[#4A00FF]', 'text-white');

    // will add all only default styles
    document.getElementById('all-btn-tab').classList.add('bg-white', 'shadow-md', 'text-[#64748B]');
    document.getElementById('open-btn-tab').classList.add('bg-white', 'shadow-md', 'text-[#64748B]');
    document.getElementById('closed-btn-tab').classList.add('bg-white', 'shadow-md', 'text-[#64748B]');
    
    const input=document.getElementById('input-search');
    const searchValue=input.value.trim().toLowerCase();
    // console.log(searchValue);

    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
    .then(res=>res.json())
    .then(data=>{
        //console.log(data);
        displayData(data.data);
    });
    
});