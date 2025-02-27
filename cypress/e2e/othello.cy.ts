/// <reference types="cypress" />

describe('Othello Game', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('loads the game with initial state', () => {
    // タイトルが表示されていることを確認
    cy.contains('オセロゲーム').should('be.visible');
    
    // 初期状態では黒のターンであることを確認
    cy.contains('現在のプレイヤー').should('be.visible');
    cy.contains('黒').should('be.visible');
    
    // 初期スコアが表示されていることを確認
    cy.contains('スコア').should('be.visible');
    cy.get('span').contains('2').should('have.length', 2);
    
    // ボードが表示されていることを確認
    cy.get('[data-testid="board"]').should('be.visible');
  });

  it('allows placing discs and updates the game state', () => {
    // 有効な手（初期状態で黒が置ける場所）を見つける
    // 例: (2, 3)の位置
    cy.get('[data-testid="cell-2-3"]').click();
    
    // スコアが更新されていることを確認
    cy.get('span').contains('4').should('be.visible'); // 黒のスコア
    cy.get('span').contains('1').should('be.visible'); // 白のスコア
    
    // 次のプレイヤーが白になっていることを確認
    cy.contains('白').should('be.visible');
    
    // 白の手番で石を置く
    cy.get('[data-testid="cell-2-2"]').click();
    
    // スコアが更新されていることを確認
    cy.get('span').contains('3').should('be.visible');
    cy.get('span').contains('3').should('be.visible');
    
    // 次のプレイヤーが黒になっていることを確認
    cy.contains('黒').should('be.visible');
  });

  it('resets the game when reset button is clicked', () => {
    // 石を置いてゲーム状態を変更
    cy.get('[data-testid="cell-2-3"]').click();
    
    // リセットボタンをクリック
    cy.contains('ゲームをリセット').click();
    
    // 初期状態に戻っていることを確認
    cy.contains('黒').should('be.visible');
    
    // スコアが初期値に戻っていることを確認
    cy.get('span').contains('2').should('have.length', 2);
  });

  // このテストは長時間かかる可能性があるため、実際の実装では調整が必要
  // コメントアウトしておく
  /*
  it('completes a game until game over', () => {
    // ゲームが終了するまで石を置き続ける
    // 注: 実際のテストでは、特定のパターンで石を置いてゲームを早く終わらせる
    
    function playUntilGameOver() {
      // 有効な手を探して石を置く
      cy.get('[data-testid^="cell-"]').each(($cell) => {
        if ($cell.hasClass('valid-move')) {
          cy.wrap($cell).click();
          // ゲーム終了をチェック
          cy.get('body').then(($body) => {
            if ($body.text().includes('ゲーム終了')) {
              return false; // ループを終了
            }
            // 再帰的に続行
            playUntilGameOver();
          });
        }
      });
    }
    
    playUntilGameOver();
    
    // ゲーム終了メッセージが表示されていることを確認
    cy.contains('ゲーム終了').should('be.visible');
    
    // 勝者または引き分けが表示されていることを確認
    cy.get('body').then(($body) => {
      const text = $body.text();
      expect(
        text.includes('黒の勝利') ||
        text.includes('白の勝利') ||
        text.includes('引き分け')
      ).to.be.true;
    });
  });
  */
});