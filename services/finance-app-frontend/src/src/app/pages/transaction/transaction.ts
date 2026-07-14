import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { Transaction } from '../../models/transaction.model';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { Pencil } from '@primeicons/angular/pencil';
import { Check } from '@primeicons/angular/check';
import { Times } from '@primeicons/angular/times';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-transaction',
  imports: [
    SelectModule,
    InputNumberModule,
    TableModule, 
    InputTextModule, 
    InputNumberModule,
    ButtonModule,
    FormsModule,
    CurrencyPipe,
    DatePipe,
    Pencil,
    Check,
    Times
  ],
  providers: [TransactionService],
  templateUrl: './transaction.html',
  styleUrl: './transaction.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionComponent implements OnInit {
  private transactionsService = inject(TransactionService);

  private cd = inject(ChangeDetectorRef);

  transactions!: Transaction[];
  clonedTransactions: { [id: number]: Transaction } = {};

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.transactionsService.getTransactions().subscribe({
      next: (data) => {
        this.transactions = data
        this.cd.markForCheck()
      },
      error: (error) => {
        throw new Error(error.message);
      }
    });
  }

  onRowEditInit(transaction: Transaction): void {
    // stash a copy so we can revert on cancel
    this.clonedTransactions[transaction.id] = { ...transaction };
  }

  onRowEditSave(transaction: Transaction): void {
    this.transactionsService.updateTransaction(transaction.id, transaction).subscribe({
      next: (edited) => {
        if (edited?.id === null) throw Error();
        this.transactions[edited.id] = edited;
        delete this.clonedTransactions[transaction.id];
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  onRowEditCancel(transaction: Transaction, index: number): void {
    // revert the row in the table back to its pre-edit state
    this.transactions[index] = this.clonedTransactions[transaction.id as number]
    delete this.clonedTransactions[transaction.id];
  }

  deleteTransaction(transaction: Transaction): void {
    this.transactionsService.deleteTransaction(transaction.id).subscribe({
      next: () => {
        delete this.transactions[transaction.id]
      },
      error: (error) => console.log(error)
    });
  }

  addTransaction(): void {
    const newTransaction: Partial<Transaction> = {
      bank: 'tmp',
      description: '',
      amount: 0,
      date_posted: new Date().toISOString().split('T')[0]
    };
    
    this.transactionsService.createTransaction(newTransaction).subscribe({
      next: () => {
        this.loadTransactions()
      },
      error: (error) => console.log(error)
    });
  }
}