const githubapi = require('../api/github_api')

beforeEach(() => {
    fetch.resetMocks();
});

test('getProfileInfo returns result', () => {
    const response = { "data": { "user": { "name": "Nikhil Paidipally", "login": "nikpik97", "bio": "I'm just a CS undergrad at UIUC. I'm always on the lookout for interesting things in the tech space.", "email": "nikhilpaidipally@gmail.com", "websiteUrl": null, "repositories": { "totalCount": 22 }, "followers": { "totalCount": 0 }, "following": { "totalCount": 0 }, "avatarUrl": "https://avatars3.githubusercontent.com/u/9312637?v=4", "createdAt": "2014-10-20T02:16:46Z" } } };
    const expectedOutput = { "name": "Nikhil Paidipally", "username": "nikpik97", "bio": "I'm just a CS undergrad at UIUC. I'm always on the lookout for interesting things in the tech space.", "email": "nikhilpaidipally@gmail.com", "website": "null", "repositories": "22", "followers": "0", "following": "0", "avatar": "https://avatars3.githubusercontent.com/u/9312637?v=4", "profile_creation_date": "2014-10-20T02:16:46Z" };
    
    fetch.mockResponseOnce(JSON.stringify(response));
    const onResponse = jest.fn();
    const onError = jest.fn();
    
    return githubapi.getProfileInfo()
    .then(onResponse)
    .catch(onError)
    .finally(() => {
        expect(onResponse).toHaveBeenCalled();
        expect(onError).not.toHaveBeenCalled();
        expect(onResponse.mock.calls[0][0]).toEqual(expectedOutput);
    });
});

test('getProfileInfo throws an error if empty object', () => {
    fetch.mockResponseOnce(JSON.stringify({}));
    const onResponse = jest.fn();
    const onError = jest.fn();
    
    return githubapi.getProfileInfo()
    .then(onResponse)
    .catch(onError)
    .finally(() => {
        expect(onResponse).not.toHaveBeenCalled();
        expect(onError).toHaveBeenCalled();
    });
});


test('getRepoInfo returns result', () => {
    const response = { "data": { "user": { "repositories": { "nodes": [{ "name": "nikpik97.github.iovvvv", "owner": { "login": "nikpik97" }, "description": "my website", "url": "https://github.com/nikpik97/nikpik97.github.iovvvv" }, { "name": "homeAutomation", "owner": { "login": "nikpik97" }, "description": null, "url": "https://github.com/nikpik97/homeAutomation" }, { "name": "Post-Harvest-System", "owner": { "login": "mudalia2" }, "description": null, "url": "https://github.com/mudalia2/Post-Harvest-System" }, { "name": "Post-Harvest-System", "owner": { "login": "nikpik97" }, "description": null, "url": "https://github.com/nikpik97/Post-Harvest-System" }, { "name": "introduction-nikpik97", "owner": { "login": "uiuc-sp18-cs126" }, "description": "introduction-nikpik97 created by GitHub Classroom", "url": "https://github.com/uiuc-sp18-cs126/introduction-nikpik97" }, { "name": "CamelCaser-nikpik97", "owner": { "login": "uiuc-sp18-cs126" }, "description": "CamelCaser-nikpik97 created by GitHub Classroom", "url": "https://github.com/uiuc-sp18-cs126/CamelCaser-nikpik97" }, { "name": "AML_HW2", "owner": { "login": "nikpik97" }, "description": null, "url": "https://github.com/nikpik97/AML_HW2" }, { "name": "AML_HW3", "owner": { "login": "nikpik97" }, "description": null, "url": "https://github.com/nikpik97/AML_HW3" }, { "name": "AML_HW4", "owner": { "login": "nikpik97" }, "description": null, "url": "https://github.com/nikpik97/AML_HW4" }, { "name": "SystemProgramming", "owner": { "login": "nikpik97" }, "description": "UIUC Crowd-Sourced System Programming Book", "url": "https://github.com/nikpik97/SystemProgramming" }, { "name": "AML", "owner": { "login": "hcher" }, "description": null, "url": "https://github.com/hcher/AML" }, { "name": "AML", "owner": { "login": "nikpik97" }, "description": null, "url": "https://github.com/nikpik97/AML" }, { "name": "Chat-Application", "owner": { "login": "nikpik97" }, "description": "Side Projects", "url": "https://github.com/nikpik97/Chat-Application" }, { "name": "Distributed_Chat_Server_and_Distributed_File_System", "owner": { "login": "nikpik97" }, "description": "Initial Commit", "url": "https://github.com/nikpik97/Distributed_Chat_Server_and_Distributed_File_System" }, { "name": "Distributed-Hash-Table", "owner": { "login": "nikpik97" }, "description": null, "url": "https://github.com/nikpik97/Distributed-Hash-Table" }, { "name": "basketball-scorer", "owner": { "login": "h-shan" }, "description": null, "url": "https://github.com/h-shan/basketball-scorer" }, { "name": "Website-Django", "owner": { "login": "nikpik97" }, "description": "A professional website, blog, portfolio, etc.", "url": "https://github.com/nikpik97/Website-Django" }, { "name": "ece408_project", "owner": { "login": "nicknytko" }, "description": "2019 Fall ECE408 Project Resources + Requirements", "url": "https://github.com/nicknytko/ece408_project" }, { "name": "UVA-SOLUTIONS", "owner": { "login": "nikpik97" }, "description": "Solutions of Some Problems of UVa Online Judge", "url": "https://github.com/nikpik97/UVA-SOLUTIONS" }, { "name": "ece408_project", "owner": { "login": "nikpik97" }, "description": "2019 Fall ECE408 Project Resources + Requirements", "url": "https://github.com/nikpik97/ece408_project" }, { "name": "senioritis", "owner": { "login": "oyangjo" }, "description": "A bunch seniors trying to pass CS/ECE 498 for the sake of fun", "url": "https://github.com/oyangjo/senioritis" }, { "name": "CS411Final", "owner": { "login": "ChongyeWang" }, "description": null, "url": "https://github.com/ChongyeWang/CS411Final" }] } } } };
    const expectedOutput = [{ "name": "nikpik97.github.iovvvv", "owner": "nikpik97", "description": "my website", "url": "https://github.com/nikpik97/nikpik97.github.iovvvv" }, { "name": "homeAutomation", "owner": "nikpik97", "description": "null", "url": "https://github.com/nikpik97/homeAutomation" }, { "name": "Post-Harvest-System", "owner": "mudalia2", "description": "null", "url": "https://github.com/mudalia2/Post-Harvest-System" }, { "name": "Post-Harvest-System", "owner": "nikpik97", "description": "null", "url": "https://github.com/nikpik97/Post-Harvest-System" }, { "name": "introduction-nikpik97", "owner": "uiuc-sp18-cs126", "description": "introduction-nikpik97 created by GitHub Classroom", "url": "https://github.com/uiuc-sp18-cs126/introduction-nikpik97" }, { "name": "CamelCaser-nikpik97", "owner": "uiuc-sp18-cs126", "description": "CamelCaser-nikpik97 created by GitHub Classroom", "url": "https://github.com/uiuc-sp18-cs126/CamelCaser-nikpik97" }, { "name": "AML_HW2", "owner": "nikpik97", "description": "null", "url": "https://github.com/nikpik97/AML_HW2" }, { "name": "AML_HW3", "owner": "nikpik97", "description": "null", "url": "https://github.com/nikpik97/AML_HW3" }, { "name": "AML_HW4", "owner": "nikpik97", "description": "null", "url": "https://github.com/nikpik97/AML_HW4" }, { "name": "SystemProgramming", "owner": "nikpik97", "description": "UIUC Crowd-Sourced System Programming Book", "url": "https://github.com/nikpik97/SystemProgramming" }, { "name": "AML", "owner": "hcher", "description": "null", "url": "https://github.com/hcher/AML" }, { "name": "AML", "owner": "nikpik97", "description": "null", "url": "https://github.com/nikpik97/AML" }, { "name": "Chat-Application", "owner": "nikpik97", "description": "Side Projects", "url": "https://github.com/nikpik97/Chat-Application" }, { "name": "Distributed_Chat_Server_and_Distributed_File_System", "owner": "nikpik97", "description": "Initial Commit", "url": "https://github.com/nikpik97/Distributed_Chat_Server_and_Distributed_File_System" }, { "name": "Distributed-Hash-Table", "owner": "nikpik97", "description": "null", "url": "https://github.com/nikpik97/Distributed-Hash-Table" }, { "name": "basketball-scorer", "owner": "h-shan", "description": "null", "url": "https://github.com/h-shan/basketball-scorer" }, { "name": "Website-Django", "owner": "nikpik97", "description": "A professional website, blog, portfolio, etc.", "url": "https://github.com/nikpik97/Website-Django" }, { "name": "ece408_project", "owner": "nicknytko", "description": "2019 Fall ECE408 Project Resources + Requirements", "url": "https://github.com/nicknytko/ece408_project" }, { "name": "UVA-SOLUTIONS", "owner": "nikpik97", "description": "Solutions of Some Problems of UVa Online Judge", "url": "https://github.com/nikpik97/UVA-SOLUTIONS" }, { "name": "ece408_project", "owner": "nikpik97", "description": "2019 Fall ECE408 Project Resources + Requirements", "url": "https://github.com/nikpik97/ece408_project" }, { "name": "senioritis", "owner": "oyangjo", "description": "A bunch seniors trying to pass CS/ECE 498 for the sake of fun", "url": "https://github.com/oyangjo/senioritis" }, { "name": "CS411Final", "owner": "ChongyeWang", "description": "null", "url": "https://github.com/ChongyeWang/CS411Final" }];
    
    fetch.mockResponseOnce(JSON.stringify(response));
    const onResponse = jest.fn();
    const onError = jest.fn();
    
    return githubapi.getRepoInfo()
    .then(onResponse)
    .catch(onError)
    .finally(() => {
        expect(onResponse).toHaveBeenCalled();
        expect(onError).not.toHaveBeenCalled();
        expect(onResponse.mock.calls[0][0]).toEqual(expectedOutput);
    });
});

test('getRepoInfo throws an error if empty object', () => {
    fetch.mockResponseOnce(JSON.stringify({}));
    const onResponse = jest.fn();
    const onError = jest.fn();
    
    return githubapi.getRepoInfo()
    .then(onResponse)
    .catch(onError)
    .finally(() => {
        expect(onResponse).not.toHaveBeenCalled();
        expect(onError).toHaveBeenCalled();
    });
});