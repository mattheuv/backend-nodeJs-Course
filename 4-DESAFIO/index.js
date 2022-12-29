import { fromEvent, 
  timer, 
  of, 
  throwError, 
 } from "rxjs";

 import {  tap,
  map,
  takeUntil,
  skipUntil,
  finalize,
  takeWhile,
  mergeMap
 } from "rxjs/operators";



const inpLetters = document.getElementById("inpLetters");
const labelPrint = document.getElementById("labelPrint");
const endProcess = () => {
  inpLetters.value = "";
  inpLetters.disabled = true;
  labelPrint.textContent = "";
};

const observable = fromEvent(inpLetters, "keyup").pipe(
  map((e) => e.target.value),
  mergeMap((e) => {
    if (e === "error") return throwError(new Error("error"));
    return of(e);
  }),
  takeWhile((e) => !(e === "complete"), false),
  takeUntil(timer(30000))
);

observable.subscribe({
  next(e) {
    labelPrint.textContent = e.split("").reverse().join("");
  },
  complete() {
    endProcess();
    console.log("El procedimiento a finalizado");
  },
  error(error) {
    endProcess();
    console.error(error);
  },
});
