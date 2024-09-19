interface IClassRoomList {
    name:String,
    grade:Number,
    classroom_id: Number,
    section:String[]
}

const ClassRoomList : IClassRoomList[] = [
    {name: 'I', grade:1, classroom_id:1001, section:["A","B","C","D"]},
    {name: 'II', grade:2,classroom_id:1002,section:["A"]},
    {name: 'III', grade:3,classroom_id:1003,section:["A","B","C"]},
    {name: 'IV', grade:4,classroom_id:1004,section:["A","B"]},
    {name: 'V', grade:5,classroom_id:1005,section:["A","B"]},
    {name: 'VI',grade:6, classroom_id:1006,section:["A","B"]},
    {name: 'VII', grade:7,classroom_id:1007,section:["A","B"]},
    {name: 'VIII', grade:8,classroom_id:1008,section:["A","B"]},
    {name: 'IX', grade:9,classroom_id:1009,section:["A","B"]},
    {name: 'X', grade:10,classroom_id:1010,section:["A","B"]},
    // {name: 'X (A)', grade:1,classroom_id:'class_X_A'},
    // {name: 'X (B)', classroom_id:'class_X_B'},
    // {name: 'X (Science Lab)', classroom_id:'class_X_science_lab'},
    // {name: 'Computer Lab', classroom_id:'class_computer_lab'}
]

export default ClassRoomList;