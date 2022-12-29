"use strict";
import { fromEvent, Observable } from "rxjs";
import { tap } from "rxjs/operators";

const inpLetters = document.getElementById("inpLetters");
const labelPrint = document.getElementById("labelPrint");
const endProcess = () => {
  inpLetters.value = "";
  inpLetters.disabled = true;
  labelPrint.textContent = "";
};

const observable = new Observable((subscriber) => {
  try {
    const emitter = fromEvent(inpLetters, "keyup").pipe(
      tap((e) => {
        const targetValue = e.target.value;
        if (targetValue === "error") subscriber.error("Error ingresado");
        if (targetValue === "complete") subscriber.complete();
      })
    );
    emitter.subscribe(subscriber);

    setTimeout(() => {
      subscriber.complete();
    }, 30000);
  } catch (error) {
    subscriber.error(error);
  }
});

observable.subscribe({
  next(e) {
    const currTargetAsArr = e.target.value.split("");
    labelPrint.textContent = currTargetAsArr.reverse().join("");
  },
  complete() {
      endProcess();
    console.log("El procedimiento a finalizado");
  },
  error(error) {
    console.error(error);
  },
});
