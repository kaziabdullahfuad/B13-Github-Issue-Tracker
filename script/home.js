console.log("Ami Home a");

const issueCount=(data)=>{

    const countIssue=document.getElementById('issue-count');
    countIssue.innerText=`${data.length} Issues`
}

const fetchAll=()=>{

    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then((res)=>res.json())
    .then(data=>displayData(data.data))
};

const displayData=(data)=>{
    // console.log(data);
    issueCount(data);

    // now show the data
    const cardContainer=document.getElementById('card-container');

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
                    <p class="text-[#EF4444] bg-[#FEECEC] py-1 px-7 rounded-xl">${elem.priority.toUpperCase()}</p>
                </div>
               <h2>${elem.title}</h2>
                <p class="mt-2 mb-3 text-sm text-[#64748B]">${elem.description}</p>

                <div class="flex gap-1 items-center mb-3">
                   ${fet}
                </div>

                <div>
                    <p class="mb-2 text-sm text-[#64748B]">#1 by ${elem.author}</p>
                    <p class="mb-2 text-sm text-[#64748B]">${elem.createdAt}</p>
                </div>
            </div>
        `;
        
        cardContainer.appendChild(githubCard);
    })
    
};

fetchAll();