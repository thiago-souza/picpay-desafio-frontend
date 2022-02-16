import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Tasks } from "../tasks/model/tasks";
import { DatePipe, formatDate } from "@angular/common";

@Component({
  selector: "app-dialog-box",
  templateUrl: "./dialog-box.component.html",
  styleUrls: ["./dialog-box.component.scss"],
})
export class DialogBoxComponent {
  message: string = "";
  user: string = "";
  date: string = "";
  value: string = "";
  confirmButtonText = "Salvar";
  cancelButtonText = "Cancelar";
  form: FormGroup;
  keyword: string = "cancelar";

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Tasks,
    private dialogRef: MatDialogRef<DialogBoxComponent>,
    private formBuilder: FormBuilder
  ) {
    if (data.action === "Delete") {
      this.message = "Excluir pagamento";
      this.user = `Usuário: ${data.name}`;
      this.date = `Data: ${data.date}`;
      this.value = `Valor: ${data.value}`;
      this.confirmButtonText = this.confirmButtonText;
      this.cancelButtonText = this.cancelButtonText;
    }
    if (data.action === "Update") {
      this.message = "Atualizar pagamento";
      this.confirmButtonText = this.confirmButtonText;
      this.cancelButtonText = this.cancelButtonText;
    }
  }

  ngOnInit() {
    let today;
    let datePipe = new DatePipe('pt-BR');
    // this.data.date = formatDate(this.data.date, 'MMM d, y, h:mm:ss a', '');
    today = datePipe.transform(this.data.date, 'd MMM y, h:mm:ss a')
    this.data.date = today
    this.form = this.formBuilder.group({
      name: ["", Validators.required],
      value: ["", Validators.required],
      datetime: ["", Validators.required],
      title: [""],
    });
  }

  submit(form) {
    if (
      form.value.name != "" &&
      form.value.value != "" &&
      form.value.datetime != ""
    ) {
      this.dialogRef.close([
        `${form.value.name}`,
        `${form.value.value}`,
        `${form.value.datetime}`,
        `${form.value.title}`,
        `${this.data.id}`,
      ]);
    }
  }

  delete() {
    this.dialogRef.close([
      `${this.data.name}`,
      `${this.data.value}`,
      `${this.data.date}`,
      `${this.data.title}`,
      `${this.data.id}`,
    ]);
  }

  dateChanged(eventDate: string): Date | null {
    return !!eventDate ? new Date(eventDate) : null;
  }
}
