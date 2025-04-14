import fetch from "node-fetch";
import { expect } from "chai";
import Ajv from "ajv";
import schema_createnewuser from "../schema/reqresSchema.js";

//GET
describe("API Tests Suite", function (){

    it("READ - Get single user", async function (){

        const hasil = await fetch('https://reqres.in/api/users/2')

        //validasi status GET
        expect(hasil.status, "terjadi kesalahan").to.equal(200)

    });

    //POST
    it("Create new User", async function (){
        const newPost ={
            name: "morpheus",
            job: "leader"
        };

        const hasilpost = await fetch('https://reqres.in/api/users',{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newPost)
        })
        //validasi status POST 
        expect(hasilpost.status, "terjadi kesalahan").to.equal(201)

        //validasi json schema POST & GET 
        const ajv = new Ajv();
        const data = await hasilpost.json();
        const testing = ajv.compile(schema_createnewuser);
        const hasil_schema = testing(data)

        expect(hasil_schema).to.be.true
    })
});