/*
layoutConfigNavegation
{
    "config": {
        "demo": "default",
        "navegation": {
            "course": {
                "id": 88013,
                "permission": 2,
                "unit": 0,
                "activity": 558543,
                "forum": 0,
                "exam": 0,
                "view_student": false,
                "type": 1
            },
            "forum": {
                "comment": 0
            },
            "member": {
                "user": ""
            },
            "tracing": {
                "user": ""
            },
            "exam": {
                "id": "",
                "ending": ""
            }
        }
    }
}


 * */


export const generateActivityNavigation = (courseId: number, activityId: number) => {
    const layoutConfigNavegation = {
        "config": {
            "demo": "default",
            "navegation": {
                "course": {
                    "id": courseId,
                    "permission": 2,
                    "unit": 0,
                    "activity": activityId,
                    "forum": 0,
                    "exam": 0,
                    "view_student": false,
                    "type": 1
                },
                "forum": {
                    "comment": 0
                },
                "member": {
                    "user": ""
                },
                "tracing": {
                    "user": ""
                },
                "exam": {
                    "id": "",
                    "ending": ""
                }
            }
        }
    }

    localStorage.setItem("layoutConfigNavegation", JSON.stringify(layoutConfigNavegation));
    localStorage.setItem("courseId", String(courseId));
    localStorage.setItem("changeActivityId", String(activityId));
 
    window.location.assign('https://eminus.uv.mx/eminus4/page/course/activity/delivery');

    return layoutConfigNavegation
}
