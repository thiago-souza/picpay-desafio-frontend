import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Tasks } from "../tasks/model/tasks";

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
    this.form = this.formBuilder.group({
      name: ["", Validators.required],
      value: ["", Validators.required],
      date: ["", Validators.required],
      title: [""],
    });
  }

  submit(form) {
    if (
      form.value.name != "" &&
      form.value.value != "" &&
      form.value.date != ""
    ) {
      this.dialogRef.close([
        `${form.value.name}`,
        `${form.value.value}`,
        `${form.value.date}`,
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
}
