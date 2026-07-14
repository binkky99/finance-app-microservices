import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction.model';

@Service()
export class TransactionService {
  private http = inject(HttpClient);
  private apiUrl = "http://localhost:3000/statements/statements";

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/`, {
      params: {
        offset: 0,
        limit: 100
      }
    });
  }

  getTransaction(id: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/${id}`);
  }

  updateTransaction(id: number, transaction: Transaction) {
    return this.http.patch<Transaction>(`${this.apiUrl}/${id}`, {
      ...transaction
    })
  }

  deleteTransaction(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  createTransaction(transaction: Partial<Transaction>) {
    return this.http.post(`${this.apiUrl}/`, {
      ...transaction
    });
  }
}
